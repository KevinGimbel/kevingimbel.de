include .env

help: ## Show this help.
	@echo "Usage: make [target]"
	@echo ""
	@echo "targets:"
	@echo ""
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/\&/' | column -s\& -t

build: ## Clear local public folder and build site
	@rm -r public || echo "public already removed"
	@hugo --config config.toml,config-next.toml --minify

upload: ## Upload the public directory to the remote server
	rsync -vhr public/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_REMOTE_DIR}" --force --delete

publish: ## Build the static site and push it to the server
	@make build
	@make upload

.PHONY: help