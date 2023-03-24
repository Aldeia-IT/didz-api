## Add the .env in the /

```bash
cp .env.example .env
```

## Add the .env in the ./main

```bash
cd main
cp .env.example .env
```



## Run the application with Docker Compose

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

Pushing to dev branch will deploy to EBS

## PR To DEV

Checking this steps

```bash
npm install
npm run lint
npm test
```