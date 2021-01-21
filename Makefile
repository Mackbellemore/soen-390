SERVER_IMAGE_TAG ?= server
CLIENT_IMAGE_TAG ?= client
DB_IMAGE_TAG ?= mongo
DB_NAME ?= app_db
DIR := ${CURDIR}

.DEFAULT_GOAL := help
.PHONY: help run run-client run-server

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-20s\033[0m %s\n", $$1, $$2}'

run: ## Start up both client and server containers
	docker-compose up --build

run-client: ## Start up client container
	docker-compose up --build $(CLIENT_IMAGE_TAG)

run-server: ## Start up server container
	docker-compose up --build $(SERVER_IMAGE_TAG)

server-sh: ## Open shell in server container
	docker-compose exec $(SERVER_IMAGE_TAG) sh

client-sh: ## Open shell in client container
	docker-compose exec $(CLIENT_IMAGE_TAG) sh

down: ## Take down containers
	docker-compose down

db-dump: ## Create MongoDB dump
	docker exec $(DB_IMAGE_TAG) sh -c \
	'exec mongodump --authenticationDatabase admin -uroot -pexample -d $(DB_NAME) --archive' \
	> $(DIR)/all-collections.archive

dbuild-client: ## Build Docker client image
	docker build ./client

dbuild-server: ## Build Docker server image
	docker build ./server
