# Running the App

## Using docker

### Development Mode

```sh
docker compose up api-dev
docker compose exec -it api-dev sh
npx prisma db push
```

