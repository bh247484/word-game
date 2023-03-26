SHELL := /bin/bash

nextjs-dev:
	docker compose up nextjs-app

psql-up:
	docker compose up db

asp-dev:
	docker compose up asp-api