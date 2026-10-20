# Shopware Practice

Shopware **6.6.10.29** in Docker, with a custom storefront theme called Shopware Practice. The theme uses the 7-1 SCSS layout and extends the storefront footer.

This project stays on Shopware 6.6 so it matches shops that have not moved to 6.7.

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

- Storefront: http://127.0.0.1:8000
- Administration: http://127.0.0.1:8000/admin
- Adminer: http://127.0.0.1:9080
- Mailpit: http://127.0.0.1:8025

Administration login: `admin` / `shopware`

Database: host `127.0.0.1`, port `3306`, database `shopware`, user `root`, password `root`.

Search uses the database. OpenSearch is not part of this stack.

MariaDB is started with a 256MB InnoDB buffer pool so the stack fits a machine that is also compiling the theme. The Shopware Docker recipe defaults are higher. Raise `innodb_buffer_pool_size` in `compose.yaml` if this shop grows.

## Theme

The theme plugin is `custom/plugins/ShopwarePractice`.

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

The web container runs with `APP_ENV=prod`. Full-page HTTP cache is turned off in `compose.override.yaml`, so a cache clear is enough to see template changes.

Open a shell in the web container with `make shell`. Storefront and Administration watchers are `make watch-storefront` and `make watch-admin`.

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
