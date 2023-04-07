# Prisma Development Scripts
.PHONY: prisma-db-push

prisma-db-push:
	script -q -c "docker compose exec -it api-dev npx prisma db push" /dev/null

.PHONY: prisma-generate

prisma-generate:
	script -q -c "docker compose exec -it api-dev npx prisma generate" /dev/null

.PHONY: prisma-studio

prisma-studio:
	script -q -c "docker compose exec -it api-dev npx prisma studio --port 5555" /dev/null

.PHONY: prisma-db-push-prod

# Prisma Production Scripts
prisma-db-push-prod:
	script -q -c "docker compose exec -it api-prod npx prisma db push" /dev/null

.PHONY: prisma-generate-prod

prisma-generate:
	script -q -c "docker compose exec -it api-prod npx prisma generate" /dev/null

.PHONY: prisma-studio-prod

prisma-studio-prod:
	script -q -c "docker compose exec -it api-prod npx prisma studio --port 5555" /dev/null
