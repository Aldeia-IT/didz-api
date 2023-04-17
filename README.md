## Run the application with Docker Compose locally

```bash
docker-compose up --remove-orphans --force-recreate
```


## Urls of deployed apps with Docker Compose

- API -> http://localhost:3000/

## Healthcheck of the API

- Healthcheck -> http://localhost:3000/healthcheck



## Swagger of the API

- Swagger -> http://localhost:3000/api



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

## IPFS With KUBO Locally

## Adding a file to IPFS

```bash
curl -X POST -F file=@file.txt "http://127.0.0.1:5001/api/v0/add"
```

## IPFS Web UI

WebUI: http://127.0.0.1:5001/webui


## To get the IPFS file

http://127.0.0.1:8080/ipfs/{CID}

## The IPFS Local Gateway

http://127.0.0.1:8080/ipfs


## Getting a list of IPFS pinned files 

```bash
curl -X POST "http://127.0.0.1:5001/api/v0/pin/ls?type=recursive"
```

