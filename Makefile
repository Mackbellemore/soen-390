SERVER_IMAGE_TAG ?= server
CLIENT_IMAGE_TAG ?= client
DB_IMAGE_TAG ?= mongo
DB_NAME ?= app_db
DIR := ${CURDIR}

CMD_DOCKER_BUILD := docker-compose up --build
CMD_DOCKER_EXEC := docker-compose exec

.DEFAULT_GOAL := help
.PHONY: help run run-client run-server

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-20s\033[0m %s\n", $$1, $$2}'

run: ## Start up both client and server containers
	$(CMD_DOCKER_BUILD)

run-client: ## Start up client container
	$(CMD_DOCKER_BUILD) $(CLIENT_IMAGE_TAG)

run-server: ## Start up server container
	$(CMD_DOCKER_BUILD) $(SERVER_IMAGE_TAG)

sh-server: ## Open shell in server container
	$(CMD_DOCKER_EXEC) $(SERVER_IMAGE_TAG) sh

sh-client: ## Open shell in client container
	$(CMD_DOCKER_EXEC) $(CLIENT_IMAGE_TAG) sh

test-server: ## Run server unit tests
	$(CMD_DOCKER_EXEC) $(SERVER_IMAGE_TAG) npm run test

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

prune: ## Remove unused images and prune volumes
	docker system prune -a --volumes
