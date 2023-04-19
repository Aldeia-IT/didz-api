
# Architecture of the project

```bash
/didz-api
    docker-compose.yml
    /api
        Dockerfile
```


# Local deploy

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


# Deploy to EBS

Pushing to develop branch will deploy to EBS

## PR To DEV

Github Action checks this actions

```bash
npm install
npm run lint
npm test
```


# IPFS With KUBO Locally

This project has a docker container running the KUBO IPFS API

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

# IPFS Provider Configuration

This project allows you to choose an IPFS provider through the .env file. Currently, we support two IPFS providers: Pinata and a local IPFS (using KUBO). 

## Pinata IPFS Configuration

To use Pinata as your IPFS provider, you need to provide the necessary API keys in the .env file. Here's the required configuration:

```bash
#PINATA IPFS NECESSARY CONFIGURATION
PINATA_IPFS_API_URL=https://api.pinata.cloud/
PINATA_IPFS_API_KEY=YOUR_PINATA_API_KEY
PINATA_IPFS_API_SECRET=YOUR_PINATA_API_SECRET
PINATA_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs
```

## Local IPFS (KUBO) Configuration

The project has a docker container with KUBO IPFS called 'didz-ipfs'. You can run the container to use a local IPFS provider. To configure the appropriate settings in the .env file:

```bash
#LOCAL IPFS
LOCAL_IPFS_API_URL=http://didz-ipfs:5001
LOCAL_IPFS_GATEWAY=http://didz-ipfs:8080/ipfs
```


## IPFS Custom Provider Implementation

The IPFS providers are located in /api/src/providers/ipfs. Each provider must implement the following interface with these three methods:

```typescript
interface IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string>;
  uploadAndPinJson(json: any): Promise<string>;
  retrieveJson(cid: string): Promise<string>;
}
```

To add a new IPFS provider:

1. Implement the 'IpfsProvider' interface in your new provider class.
2. Update the 'ipfs.provider.factory.ts' file to include the new provider.
3. Add the necessary configuration settings for the new provider in the .env file.

Finally, import the new provider into the ipfs.provider.factory.ts file, and the project will be ready to use it.
