SERVER_IMAGE_TAG ?= server
CLIENT_IMAGE_TAG ?= client
.DEFAULT_GOAL := help
.PHONY: help run run-client run-server

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-20s\033[0m %s\n", $$1, $$2}'

run: ## Start up both client and server containers
	docker-compose up --build

run-client: ## Start up client container
	docker-compose up --build client

run-server: ## Start up server container
	docker-compose up --build server

server-sh:
	docker-compose exec $(SERVER_IMAGE_TAG) sh

client-sh:
	docker-compose exec $(CLIENT_IMAGE_TAG) sh

down:
	docker-compose down
