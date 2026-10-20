# Shopware Practice

Shopware **6.6.10.29** in Docker, with a custom storefront theme called Shopware Practice. The theme uses the 7-1 SCSS layout and extends the storefront footer.

This project stays on Shopware 6.6 so it matches shops that have not moved to 6.7.

## Copy components into another project

Open the [copyable CMS library](cms-library/README.md), choose a block, and follow its installation README. Each of the 20 packages contains a mergeable `src/` folder with its editor, preview, translations, styles, templates and custom dependencies. PHP packages include namespace and service-import instructions.

The working theme is the source of truth. After editing it, refresh the copyable packages with `make export-cms-library`, then validate them with `make check-cms-library`. Python 3 is required for these commands; Docker is not.

## Requirements

- Docker
- Docker Compose
- make

## Start

```bash
make up
make setup
```

`make setup` installs Shopware, creates the database, and assigns the Shopware Practice theme to the storefront. Running it again drops the database and installs a fresh shop.

- Storefront: http://127.0.0.1:8002
- Administration: http://127.0.0.1:8002/admin
- Adminer: http://127.0.0.1:9081
- Mailpit: http://127.0.0.1:8026

The local override uses separate ports to coexist with another Shopware stack: SMTP `1026`, Administration watcher `8081`, storefront watchers `10098`/`10099`, and Vite `5174`/`5774`.

Administration login: `admin` / `shopware`

In the first-run wizard, skip the Shopware Account and Shopware Store steps for local development. They use an online Shopware account, not the local Administration credentials above.

Database: host `127.0.0.1`, port `3306`, database `shopware`, user `root`, password `root`.

Search uses the database. OpenSearch is not part of this stack.

MariaDB is started with a 256MB InnoDB buffer pool so the stack fits a machine that is also compiling the theme. The Shopware Docker recipe defaults are higher. Raise `innodb_buffer_pool_size` in `compose.yaml` if this shop grows.

## Theme

The theme plugin is `custom/plugins/ShopwarePractice`.

Additional library blocks in Shopping Experiences:

- **3 cards with image** under **Text & images**: three content cards with separate image slots.
- **Brand logo grid** under **Images**: four logos with editable titles.
- **3 cards with background image** under **Text**: three cards with background media, text and buttons.

Their styles are in `src/Resources/app/storefront/src/scss/cms-library/`. Choose images and enter content in the layout editor.

The **Category card group grid** block is available under **Images** in Shopping Experiences. Select an active category for each of its four cards; cards use the category's name, image and link. Unconfigured cards are hidden on the storefront. Styles live in `src/Resources/app/storefront/src/scss/cms-library/_category-card-group-grid.scss`.

The theme includes the **Three image panels (no gaps)** block under **Text & images** in Shopping Experiences. Each panel has its own media selection, heading, paragraph and button. The panels stack on mobile and sit next to each other from 992px. Styles live in `src/Resources/app/storefront/src/scss/cms-library/_three-image-panels.scss`.

SCSS follows the 7-1 layout in `src/Resources/app/storefront/src/scss/`:

| Folder | Role |
| --- | --- |
| `abstracts/` | Variables, functions, mixins, placeholders |
| `vendors/` | Third-party styles |
| `base/` | Element, typography, and helper styles |
| `layout/` | Header, navigation, grid, footer |
| `components/` | UI pieces such as buttons |
| `pages/` | Page-specific styles |
| `themes/` | Theme-level adjustments |

`base.scss` is the Shopware entry file and imports those folders. `overrides.scss` loads before the default Storefront styles. Put Bootstrap or Shopware variable overrides there.

The footer template is `src/Resources/views/storefront/layout/footer/footer.html.twig`. It extends the Storefront footer and adds a Shopware Practice band above the copyright. The band is styled in `layout/_footer.scss`.

After SCSS or `theme.json` changes:

```bash
make theme
```

After Twig changes:

```bash
docker compose exec web bin/console cache:clear
```

The web container runs with `APP_ENV=dev` and debug enabled so Shopware injects live-reload scripts when using the watcher. Full-page HTTP cache is turned off in `compose.override.yaml`.

Open a shell in the web container with `make shell`. Storefront and Administration watchers are `make watch-storefront` and `make watch-admin`.

For storefront live reload, run `make watch-storefront` and open http://127.0.0.1:10098. Keep the command running while editing SCSS, JavaScript, or Twig. The watcher serves development assets and its WebSocket on port `10099`. The first start installs its Node dependencies.

File watching uses polling so changes on the host are detected through the Docker mount.

To inspect the background watcher started during local setup:

```bash
docker compose exec web tail -f /tmp/watch-storefront.log
```

The background watcher stops with the web container. After restarting the container, run `make watch-storefront` again.

## Stop

```bash
make stop
```

Remove the containers and keep the database volume:

```bash
make down
```

Remove the containers and the database:

```bash
docker compose down -v
```

## CMS block library

The library blocks are installed in Shopware Practice and adapted for Shopware 6.6. Choose them in Shopping Experiences, then select media, categories or products and save the layout. Existing four-cards-stacked blocks keep their original four content slots and card image picker.

| Block | Shopping Experiences category |
| --- | --- |
| `3-cards-with-background-image` | Text |
| `3-cards-with-image` | Text & images |
| `category-background-card-group-grid` | Images |
| `category-card-group-grid` | Images |
| `designer-product-slider` | Commerce |
| `four-cards` | Text |
| `four-cards-stacked` | Text |
| `hero-card-slider` | Text & images |
| `hero-newsletter` | Forms |
| `icon-accordion` | Text |
| `information-card-slider` | Text & images |
| `brand-logo-grid` | Images |
| `masonry-grid` | Images |
| `promo-image-text-hero` | Text & images |
| `promo-switcher-text-image-hero` | Text & images |
| `promo-text-image-hero` | Text & images |
| `split-text-buttons` | Text |
| `three-cards` | Text |
| `three-image-panels` | Text & images |
| `three-linked-category-image-panels` | Text & images |
