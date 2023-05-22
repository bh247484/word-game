SHELL := /bin/bash

vite-dev:
	docker compose up vite-react-app

psql-up:
	docker compose up db

rails-dev:
	docker compose up rails-api