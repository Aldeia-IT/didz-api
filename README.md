## Run the application with Docker Compose locally

```bash
docker-compose up --remove-orphans --force-recreate
```


## Urls of deployed apps with Docker Compose

- API -> http://localhost:3000/


## Architecture of the project

```bash
/didz-api
    docker-compose.yml
    /api
        Dockerfile
```


## Deploy to EBS

Pushing to develop branch will deploy to EBS

## PR To DEV

Github Action checks this actions

```bash
npm install
npm run lint
npm test
```
