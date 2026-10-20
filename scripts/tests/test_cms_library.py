import contextlib
import importlib.util
import io
import json
from pathlib import Path
import re
import tempfile
import unittest
from unittest.mock import patch
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location('cms_exporter', ROOT / 'scripts/export-cms-library.py')
EXPORTER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(EXPORTER)


class PortablePackagesTest(unittest.TestCase):
    def test_storefront_snippet_filenames_identify_the_language(self):
        for path in (EXPORTER.SOURCE / 'Resources/snippet').glob('*.json'):
            with self.subTest(file=path.name):
                # Shopware reads the second dot-separated segment as the locale.
                parts = path.stem.split('.')
                self.assertIn(len(parts), (2, 3))
                self.assertIn(parts[1], ('en-GB', 'de-DE'))

    def test_every_package_is_self_contained(self):
        catalog = json.loads((ROOT / 'cms-library/catalog.json').read_text())
        self.assertEqual(len({item['name'] for item in catalog}), len(catalog))
        for item in catalog:
            with self.subTest(block=item['name']):
                package = ROOT / 'cms-library' / item['name']
                manifest = json.loads((package / 'manifest.json').read_text())
                for filename in manifest['files']:
                    file = package / filename
                    self.assertTrue(file.is_file(), filename)
                    content = file.read_text()
                    self.assertNotIn('/Users/', content)
                    self.assertNotIn('ShopwarePractice\\Cms', content)
                    if file.suffix == '.js':
                        for reference in re.findall(r'(?:from\s+|import\s*)[\'\"](\.[^\'\"]+)[\'\"]', content):
                            target = file.parent / reference
                            options = [target, Path(str(target) + '.js'), target / 'index.js']
                            self.assertTrue(any(path.is_file() for path in options), f'{filename}: {reference}')
                    if file.suffix == '.php':
                        for parent in re.findall(r'extends\s+(\w+)', content):
                            if parent != 'AbstractCmsElementResolver':
                                self.assertTrue((file.parent / (parent + '.php')).is_file(), parent)
                    if file.suffix == '.xml':
                        namespace = {'s': 'http://symfony.com/schema/dic/services'}
                        for service in ET.fromstring(content).findall('.//s:service', namespace):
                            identifier = service.get('id', '')
                            if identifier.startswith('YourTheme\\Cms\\'):
                                resolver = identifier.split('\\')[-1]
                                self.assertTrue((package / 'src/Cms' / (resolver + '.php')).is_file(), resolver)
                for element in manifest['customElements']:
                    self.assertTrue((package / 'src' / EXPORTER.ADMIN / 'elements' / element / 'index.js').is_file())
                combined_templates = '\n'.join((package / filename).read_text() for filename in manifest['files'] if filename.endswith('.twig'))
                for template in re.findall(r'@Storefront/([^\s\'\"]+\.html\.twig)', combined_templates):
                    custom_source = EXPORTER.SOURCE / 'Resources/views' / template
                    if custom_source.is_file():
                        self.assertTrue((package / 'src/Resources/views' / template).is_file(), template)

    def test_export_check_detects_drift_without_rewriting(self):
        catalog = json.loads((ROOT / 'cms-library/catalog.json').read_text())
        with tempfile.TemporaryDirectory() as directory:
            library = Path(directory)
            (library / 'catalog.json').write_text(json.dumps([catalog[0]]))
            with patch.object(EXPORTER, 'LIBRARY', library), patch('sys.argv', ['export']), contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(EXPORTER.main(), 0)
                file = library / catalog[0]['name'] / 'README.md'
                file.write_text('Changed locally\n')
                with patch('sys.argv', ['export', '--check']), contextlib.redirect_stderr(io.StringIO()):
                    self.assertEqual(EXPORTER.main(), 1)
                self.assertEqual(file.read_text(), 'Changed locally\n')

    def test_stacked_style_export_does_not_include_unrelated_hero(self):
        source = (EXPORTER.SOURCE / 'Resources/app/storefront/src/scss/base/_base.scss').read_text()
        styles = EXPORTER.selected_styles(source, '.cms-block-four-cards-stacked')
        self.assertIn('.cms-block-four-cards-stacked', styles)
        self.assertNotIn('promo-image-text-hero', styles)


if __name__ == '__main__':
    unittest.main()
