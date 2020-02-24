help: ## Show this help.
	@echo "Usage: make [target]"
	@echo ""
	@echo "targets:"
	@echo ""
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/\&/' | column -s\& -t

build: ## Build site for production
	@hugo --minify

dev: ## Start hugo server
	@hugo serve -w --buildDrafts --buildFuture

.PHONY: help
