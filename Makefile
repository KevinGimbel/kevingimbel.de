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

post-photo: ## Create new photography post. Specify title like title="my title"
	@hugo new photography/$(shell date +%Y)-$(shell echo "${title}" | sed -e 's/ /-/g')

post-blog: ## Create new blog post. Specify title like title="my title"
	@hugo new blog/$(shell date +%Y-%m-%d)-$(shell echo "${title}" | sed -e 's/ /-/g')/index.md

post-book: ## Create new book post. Specify title like title="my title"
	@hugo new reading/$(shell date +%Y)/$(shell echo "${title}" | sed -e 's/ /-/g').md

post-link: ## Create new link post. Specify title like title="my title"
	@hugo new -k link blog/$(shell date +%Y-%m-%d)-$(shell echo "${title}" | sed -e 's/ /-/g').md

.PHONY: help