# Marvel

Project serving RESTful APIs using Node.js, Express, redis and Nginx

## Requirements

 - [Node v16.8.0](https://nodejs.org/en/download/current/)
 - [Docker](https://www.docker.com/)

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone https://github.com/nicyow/marvel.git
cd marvel-app
```

#### Bring up all service:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d --remove-orphans
```

## Unit Test

```bash
cd ./app
npm test
```

## Caching
### Assumptions:
1. Marvel Comics API data update not frequently, at most daily.
2. There are more than one application instance running.
3. Future enhancement: there will be a separate job running to update the redis cache asynchronous (probably daily, depends on needs), to reduce latency for even the first call to /characters endpoint.

### Approach:
1. Reverse proxy cache - nginx
   1. Content available even server or service temporary unavailable, nginx is still able to serve the cached content.
   2. Reduce load to application, the application doesn't need to handle the load (request not even hit the app).
2. Redis cache
   1. Fast and high availability.
   2. Reduce the load to call external API.
   3. As a distributed shared cache, no need to worry cache consistency when there are multiple application instances.
   4. Using hash data type for fast retriving and storing.