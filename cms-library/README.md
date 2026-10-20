# Copyable Shopware CMS blocks

Pick a block below, open its README, and copy its `src/` contents into your theme/plugin's `src/`. Each package contains its custom dependencies, editor, preview, translations, Twig and SCSS. Packages that need PHP include their resolvers and service XML.

**Target: Shopware 6.6.** These exports come from the working Shopware Practice theme, including its current fixes. They are source additions, not individually installable plugins. Adapt Administration controls before using them on 6.7.

## Pick a block

| Block and installation guide | Shopping Experiences category |
| --- | --- |
| [3-cards-with-background-image](3-cards-with-background-image/README.md) | Text |
| [3-cards-with-image](3-cards-with-image/README.md) | Text & images |
| [brand-logo-grid](brand-logo-grid/README.md) | Images |
| [category-background-card-group-grid](category-background-card-group-grid/README.md) | Images |
| [category-card-group-grid](category-card-group-grid/README.md) | Images |
| [designer-product-slider](designer-product-slider/README.md) | Commerce |
| [four-cards](four-cards/README.md) | Text |
| [four-cards-stacked](four-cards-stacked/README.md) | Text |
| [hero-card-slider](hero-card-slider/README.md) | Text & images |
| [hero-newsletter](hero-newsletter/README.md) | Forms |
| [icon-accordion](icon-accordion/README.md) | Text |
| [information-card-slider](information-card-slider/README.md) | Text & images |
| [masonry-grid](masonry-grid/README.md) | Images |
| [promo-image-text-hero](promo-image-text-hero/README.md) | Text & images |
| [promo-switcher-text-image-hero](promo-switcher-text-image-hero/README.md) | Text & images |
| [promo-text-image-hero](promo-text-image-hero/README.md) | Text & images |
| [split-text-buttons](split-text-buttons/README.md) | Text |
| [three-cards](three-cards/README.md) | Text |
| [three-image-panels](three-image-panels/README.md) | Text & images |
| [three-linked-category-image-panels](three-linked-category-image-panels/README.md) | Text & images |

## Copy into another project

1. Merge the chosen package's `src/` into your theme/plugin's `src/`.
2. Copy the Administration and SCSS import lines from that package's README.
3. For blocks with PHP resolvers, replace `YourTheme\Cms` with your namespace and add the XML import shown in the README.
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
