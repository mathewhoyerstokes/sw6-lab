# brand-logo-grid

Copyable CMS block for **Shopware 6.6**. Find it under **Images** in Shopping Experiences. This is source for an existing theme/plugin, not a standalone plugin. Shopware 6.7 requires adapting Administration controls and rebuilding there.

## Install

1. Copy the contents of `src/` into your theme/plugin's `src/`, merging directories. Shared dependencies are included. When installing several blocks, copy shared files once and preserve any changes you already made.

2. Add to `src/Resources/app/administration/src/main.js`:

   ```js
   import './module/sw-cms/library/brand-logo-grid';
   ```

3. Add to your storefront `base.scss`, after Shopware's styles:

   ```scss
   @import "cms-library/brand-logo-grid";
   ```

## Build and use

Run in the destination project's PHP/Node environment (inside its container when applicable):

```bash
bin/build-administration.sh
bin/console cache:clear
bin/console theme:compile
```

Activate your theme and assign it to the sales channel. Refresh Administration, add the block to a Shopping Experience, configure its content, and save. Assign that layout to the intended storefront page.

## Customize

- Styles: `src/Resources/app/storefront/src/scss/cms-library/_brand-logo-grid.scss`.
- Frontend templates: `src/Resources/views/storefront/`.
- Editor and previews: `src/Resources/app/administration/src/module/sw-cms/`.
- `manifest.json` lists all files and custom dependencies.

Shopware supplies native image/product/form elements, Bootstrap and slider behavior. No uploaded media, saved layouts, database IDs, local ports or global section padding are bundled. Choose content in the destination shop. Keep CMS block/element identifiers unchanged once layouts have been saved.

Generated from this repository's working theme. Edit the theme source, then run `make export-cms-library` to refresh this package.
