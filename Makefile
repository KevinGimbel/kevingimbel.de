include .env

help: ## Show this help.
	@echo "Usage: make [target]"
	@echo ""
	@echo "targets:"
	@echo ""
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/\&/' | column -s\& -t

build: ## Clear local public folder and build site
	npm run build

upload: ## Upload the public directory to the remote server
	rsync -vhr docs/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_REMOTE_DIR}" --force --delete

publish-next: ## Build the static site and push it to the server
	@NODE_ENV= make build
	@make upload

publish-prod: ## Build the static site and push it to the server
	@NODE_ENV=production make build
	@git add .
	@git commit -m "chore: build site"
	@git push origin main

post: ## Create new photography post. Specify title like title="my title"
	@node scripts/new-post "${title}"

# post-blog: ## Create new blog post. Specify title like title="my title"
# 	@hugo new blog/$(shell date +%Y-%m-%d)-$(shell echo "${title}" | sed -e 's/ /-/g')/index.md

# post-book: ## Create new book post. Specify title like title="my title"
# 	@hugo new reading/$(shell date +%Y)/$(shell echo "${title}" | sed -e 's/ /-/g').md

# post-link: ## Create new link post. Specify title like title="my title"
# 	@hugo new -k link blog/$(shell date +%Y-%m-%d)-$(shell echo "${title}" | sed -e 's/ /-/g').md

.PHONY: help