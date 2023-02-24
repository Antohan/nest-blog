# Blog Nest-backend

## Run DB

```bash
docker run --name blog-postgres \
  -e POSTGRES_DB=blog \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_HOST=localhost \
  -v blog-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  -d postgres:12.14-alpine
```
