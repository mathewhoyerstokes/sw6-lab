ifndef APP_ENV
    include .env
endif

.DEFAULT_GOAL := help
.PHONY: export-cms-library check-cms-library
export-cms-library: ## Refresh copyable CMS packages from the theme source
	python3 scripts/export-cms-library.py

check-cms-library: ## Verify CMS exports and their dependencies
	python3 scripts/export-cms-library.py --check
	python3 -m unittest discover -s scripts/tests

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "}; /^[a-zA-Z-]+:.*?## .*$$/ {printf "[32m%-15s[0m %s\n", $$1, $$2}' Makefile | sort

###> shopware/docker-dev ###
up:
	@touch .env.local
	docker compose up -d
stop:
	docker compose stop
down:
	docker compose down
shell:
	docker compose exec web bash
watch-storefront:
	docker compose exec -e PROXY_URL=http://127.0.0.1:10098 -e STOREFRONT_PROXY_PORT=10098 -e STOREFRONT_ASSETS_PORT=10099 web ./bin/watch-storefront.sh ShopwarePractice
watch-admin:
	docker compose exec web ./bin/watch-administration.sh
build-storefront:
	docker compose exec web ./bin/build-storefront.sh
build-administration:
	docker compose exec web ./bin/build-administration.sh
setup:
	docker compose exec web composer install
	docker compose exec web bin/console system:install --basic-setup --create-database --drop-database --force
	$(MAKE) theme
###< shopware/docker-dev ###

.PHONY: theme
theme: ## Install Shopware Practice and assign it to the storefront
	docker compose exec web bin/console plugin:refresh
	docker compose exec web bin/console plugin:install --activate ShopwarePractice
	docker compose exec web bin/console theme:refresh
	docker compose exec web bin/console theme:change ShopwarePractice --all --sync
	docker compose exec web bin/console cache:clear
