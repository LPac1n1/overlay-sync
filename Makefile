up:
	docker-compose up -d

stop:
	docker-compose stop

build-up:
	docker-compose up --build -d

down:
	docker-compose down

restart:
	docker-compose down -v
	docker-compose up --build -d

logs:
	docker-compose logs -f

client:
	docker-compose exec client sh

server:
	docker-compose exec server sh

nginx:
	docker-compose exec nginx sh

postgres:
	docker-compose exec postgres psql -U $$POSTGRES_USER -d $$POSTGRES_DB

ps:
	docker-compose ps

prune:
	docker system prune -af

rebuild-client:
	docker-compose build client

rebuild-server:
	docker-compose build server

rebuild-nginx:
	docker-compose build nginx
