SHELL := /bin/bash

vite-dev:
	docker compose up vite-react-app

psql-up:
	docker compose up db

asp-dev:
	docker compose up asp-api