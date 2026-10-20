#!/usr/bin/env python3
"""Export portable CMS packages from the working theme; requires only Python 3."""

import argparse
import copy
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'custom/plugins/ShopwarePractice/src'
LIBRARY = ROOT / 'cms-library'
ADMIN = Path('Resources/app/administration/src/module/sw-cms')
CATEGORIES = {'text': 'Text', 'text-image': 'Text & images', 'image': 'Images',
              'commerce': 'Commerce', 'form': 'Forms'}


def merge(target, source):
    for key, value in source.items():
        if isinstance(value, dict) and isinstance(target.get(key), dict):
            merge(target[key], value)
        else:
            target[key] = copy.deepcopy(value)


def selected_styles(text, selector):
    """Extract complete top-level SCSS rules without pulling in unrelated blocks."""
    rules = []
    for match in re.finditer(r'^' + re.escape(selector) + r'[^\n{]*\{', text, re.M):
        depth = 1
        end = match.end()
        while depth and end < len(text):
            depth += (text[end] == '{') - (text[end] == '}')
            end += 1
        if depth:
            raise ValueError(f'Unclosed SCSS rule: {selector}')
        rules.append(text[match.start():end])
    if not rules:
        raise ValueError(f'Missing SCSS selector: {selector}')
    return '\n\n'.join(rules) + '\n'


def build_package(item):
    name = item['name']
    files = {}

    def add(path):
        path = Path(path)
        if path not in files:
            files[path] = (SOURCE / path).read_text()

    def add_directory(path):
        directory = SOURCE / path
        if not directory.is_dir():
            raise ValueError(f'Missing component directory: {directory}')
        for file in sorted(directory.rglob('*')):
            if file.is_file():
                add(file.relative_to(SOURCE))

    add_directory(Path(item['blockDirectory']))
    elements = set(item['customElements'])
    for element in sorted(elements):
        add_directory(ADMIN / 'elements' / element)
    for template in item['templates']:
        add(template)
    for resolver in item['resolverClasses']:
        add(Path('Cms') / (resolver + '.php'))

    # Include literal custom Twig parents/includes and JS module dependencies.
    # Dynamic slot templates are covered by customElements in the catalog.
    scanned = set()
    while set(files) - scanned:
        for path in list(set(files) - scanned):
            scanned.add(path)
            text = files[path]
            for template in re.findall(r'@(?:Storefront|ShopwarePractice)/([^\s\'\"]+\.html\.twig)', text):
                dependency = Path('Resources/views') / template
                if (SOURCE / dependency).exists():
                    add(dependency)
            if path.suffix == '.js':
                for reference in re.findall(r'(?:from\s+|import\s*)[\'\"](\.[^\'\"]+)[\'\"]', text):
                    dependency = (SOURCE / path.parent / reference).resolve()
                    dependency.relative_to(SOURCE)
                    if dependency.is_dir():
                        add_directory(dependency.relative_to(SOURCE))
                    else:
                        if not dependency.exists():
                            dependency = dependency.with_suffix('.js')
                        add(dependency.relative_to(SOURCE))

    # Each package has one entry file and a scoped, readable style entry.
    entry = ADMIN / 'library' / name
    imports = [f"import '../../elements/{element}';" for element in sorted(elements)]
    block_path = Path(item['blockDirectory']).relative_to(ADMIN)
    imports.append(f"import '../../{block_path.as_posix()}';")
    for locale in ['en-GB', 'de-DE']:
        snippets = json.loads((SOURCE / 'Resources/app/administration/src/snippet' / (locale + '.json')).read_text())
        for directory in [entry] + [ADMIN / 'library' / element for element in sorted(elements)]:
            snippet = SOURCE / directory / (locale + '.json')
            if snippet.exists():
                merge(snippets, json.loads(snippet.read_text()))
        # Include only snippet groups referenced by this component/dependencies.
        used_text = '\n'.join(files.values())

        def filter_snippets(values, prefix=''):
            result = {}
            for key, value in values.items():
                full = f'{prefix}.{key}' if prefix else key
                if isinstance(value, dict):
                    selected = filter_snippets(value, full)
                    if selected:
                        result[key] = selected
                elif full in used_text:
                    result[key] = value
            return result

        files[entry / (locale + '.json')] = json.dumps(filter_snippets(snippets), ensure_ascii=False, indent=2) + '\n'
        variable = locale.replace('-', '')
        imports.extend([f"import {variable} from './{locale}.json';",
                        f"Shopware.Locale.extend('{locale}', {variable});"])
    files[entry / 'index.js'] = '\n'.join(imports) + '\n'

    for snippet in sorted((SOURCE / 'Resources/snippet').glob(name + '.*.json')):
        add(snippet.relative_to(SOURCE))

    style = (SOURCE / item['style']).read_text()
    if item.get('styleSelector'):
        style = selected_styles(style, item['styleSelector'])
    style_path = Path('Resources/app/storefront/src/scss/cms-library') / ('_' + name + '.scss')
    files[style_path] = style

    service = Path('Resources/config/cms-library') / (name + '.xml')
    if (SOURCE / service).exists():
        add(service)
    for path, text in list(files.items()):
        if path.suffix in {'.php', '.xml'}:
            files[path] = text.replace('ShopwarePractice\\Cms', 'YourTheme\\Cms')

    manifest = {
        'block': name,
        'shopwareVersion': '6.6',
        'category': CATEGORIES.get(item['category'], item['category']),
        'customElements': sorted(elements),
        'resolverClasses': item['resolverClasses'],
        'administrationImport': f"import './module/sw-cms/library/{name}';",
        'scssImport': f'@import "cms-library/{name}";',
        'serviceImport': f'cms-library/{name}.xml' if service in files else None,
        'files': ['src/' + str(path) for path in sorted(files)],
    }
    output = {Path('src') / path: text for path, text in files.items()}
    output[Path('manifest.json')] = json.dumps(manifest, indent=2) + '\n'
    output[Path('README.md')] = package_readme(manifest)
    return output


def package_readme(manifest):
    name = manifest['block']
    service = manifest['serviceImport']
    php = ''
    if service:
        php = f'''
4. Replace `YourTheme\\Cms` with your plugin's PSR-4 namespace followed by `\\Cms` in the copied PHP files and service XML. Parent resolver classes are included. Merge this import into your existing `src/Resources/config/services.xml` container:

   ```xml
   <imports>
       <import resource="{service}"/>
   </imports>
   ```
'''
    notes = ''
    if name == 'information-card-slider':
        notes = '\nImages are optional. All configured cards remain in the slider, even without media. Remove unused cards in the editor to avoid empty cards.\n'
    if name == 'hero-card-slider':
        notes = '\nHero slides require an image; slides without media are hidden.\n'
    if name == 'four-cards-stacked':
        notes = '\nThis is the existing four-slot version from this project. Each content card has its own image picker; no additional native image slots are added.\n'
    return f'''# {name}

Copyable CMS block for **Shopware 6.6**. Find it under **{manifest['category']}** in Shopping Experiences. This is source for an existing theme/plugin, not a standalone plugin. Shopware 6.7 requires adapting Administration controls and rebuilding there.

## Install

1. Copy the contents of `src/` into your theme/plugin's `src/`, merging directories. Shared dependencies are included. When installing several blocks, copy shared files once and preserve any changes you already made.

2. Add to `src/Resources/app/administration/src/main.js`:

   ```js
   {manifest['administrationImport']}
   ```

3. Add to your storefront `base.scss`, after Shopware's styles:

   ```scss
   {manifest['scssImport']}
   ```
{php}
## Build and use

Run in the destination project's PHP/Node environment (inside its container when applicable):

```bash
bin/build-administration.sh
bin/console cache:clear
bin/console theme:compile
```

Activate your theme and assign it to the sales channel. Refresh Administration, add the block to a Shopping Experience, configure its content, and save. Assign that layout to the intended storefront page.

## Customize

- Styles: `src/Resources/app/storefront/src/scss/cms-library/_{name}.scss`.
- Frontend templates: `src/Resources/views/storefront/`.
- Editor and previews: `src/Resources/app/administration/src/module/sw-cms/`.
- `manifest.json` lists all files and custom dependencies.
{notes}
Shopware supplies native image/product/form elements, Bootstrap and slider behavior. No uploaded media, saved layouts, database IDs, local ports or global section padding are bundled. Choose content in the destination shop. Keep CMS block/element identifiers unchanged once layouts have been saved.

Generated from this repository's working theme. Edit the theme source, then run `make export-cms-library` to refresh this package.
'''


def library_readme(catalog):
    text = '''# Copyable Shopware CMS blocks

Pick a block below, open its README, and copy its `src/` contents into your theme/plugin's `src/`. Each package contains its custom dependencies, editor, preview, translations, Twig and SCSS. Packages that need PHP include their resolvers and service XML.

**Target: Shopware 6.6.** These exports come from the working Shopware Practice theme, including its current fixes. They are source additions, not individually installable plugins. Adapt Administration controls before using them on 6.7.

## Pick a block

| Block and installation guide | Shopping Experiences category |
| --- | --- |
'''
    for item in catalog:
        name = item['name']
        category = CATEGORIES.get(item['category'], item['category'])
        text += f'| [{name}]({name}/README.md) | {category} |\n'
    return text + '''
## Copy into another project

1. Merge the chosen package's `src/` into your theme/plugin's `src/`.
2. Copy the Administration and SCSS import lines from that package's README.
3. For blocks with PHP resolvers, replace `YourTheme\\Cms` with your namespace and add the XML import shown in the README.
4. Build Administration, clear the cache, compile the theme, then assign the theme and layout to your storefront.

When installing several blocks, keep shared element folders and resolver parents only once. Preserve changes you already made to shared files. Each `manifest.json` lists the complete file set; imports are relative, with no dependency on this repository's directory name or local Docker ports.

Shopware supplies native image/product/form elements, Bootstrap, sliders and collapse behavior. Uploaded media, saved layouts and product/category selections are not exported. Choose those in the destination shop. Global section padding is intentionally separate from the blocks.

The existing four-cards-stacked layout is preserved. The Information card slider supports text-only cards; the Hero card slider requires images.

## Maintain this library

The working source is `custom/plugins/ShopwarePractice/src/`. Edit and preview components there, then run from the repository root:

```bash
make export-cms-library
make check-cms-library
```

Exporting needs Python 3, with no extra packages or running Docker containers. It refreshes these generated folders using `catalog.json`; it does not change the working theme. Commit the theme changes and regenerated packages together. Avoid editing generated copies directly: the next export replaces them.

To add a block, register it in the working theme and add its source paths, custom element dependencies and resolver classes to `catalog.json`, then export again.
'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='fail if committed exports differ from the theme')
    args = parser.parse_args()
    catalog = json.loads((LIBRARY / 'catalog.json').read_text())
    packages = {item['name']: build_package(item) for item in catalog}
    # Validate every package before writing anything.
    for name, files in packages.items():
        for path, text in files.items():
            if path.suffix == '.json':
                json.loads(text)
            if path.suffix == '.xml':
                ET.fromstring(text)
            if '/Users/' in text or 'ShopwareDesignSystem\\Cms' in text:
                raise ValueError(f'Nonportable reference: {name}/{path}')
    stale = []
    for name, files in packages.items():
        target = LIBRARY / name
        previous = target / 'manifest.json'
        old_files = json.loads(previous.read_text())['files'] if previous.exists() else []
        for path in old_files:
            relative = Path(path)
            if relative.is_absolute() or '..' in relative.parts:
                raise ValueError(f'Invalid generated path: {relative}')
            if relative not in files and (target / relative).exists():
                stale.append(str(target / relative))
                if not args.check:
                    (target / relative).unlink()
        for path, text in files.items():
            output = target / path
            if not output.exists() or output.read_text() != text:
                stale.append(str(Path(LIBRARY.name) / name / path))
                if not args.check:
                    output.parent.mkdir(parents=True, exist_ok=True)
                    output.write_text(text)
    if args.check and stale:
        print('Exports need refreshing. Run make export-cms-library.\n' + '\n'.join(stale), file=sys.stderr)
        return 1
    index = LIBRARY / 'README.md'
    expected_index = library_readme(catalog)
    if args.check and (not index.exists() or index.read_text() != expected_index):
        print('Library index needs refreshing. Run make export-cms-library.', file=sys.stderr)
        return 1
    if not args.check:
        index.write_text(expected_index)
    print(f'{"Checked" if args.check else "Exported"} {len(packages)} portable CMS blocks.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
