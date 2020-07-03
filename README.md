## API Service

### Running the server
Before you run the server you need to install a few dependencies. First, install the Node.js 8.x runtime by following the instructions provided on <a href="https://nodejs.org" target="_blank">nodejs.org</a>. Second, install <a href="http://gulpjs.com" target="_blank">gulp</a>, which is used to run the server build. The remaining dependencies are defined in the package.json and can be added via npm. Open the "production" folder and run the following commands to start the API service:

```
npm install --update-binary --no-shrinkwrap
npm start
```

To view the Swagger UI interface:

```
http://localhost:8088/api-docs
```

Additionally you can test the build by running:

```
npm run build
```
This will run the gulp build setup for the service, which is currently only running eslint, but eventually will be used to run tests. For more information about creating gulp tasks refer to [gulpjs.com](https://gulpjs.com).

### Docker
#### Build
To build the docker container you need to install <a href="https://www.docker.com" target="_blank">Docker</a> and use "docker build", providing the directory of this service. You should also consider providing a repository name and tag as well, so it is easy to identify your docker container image when running "docker images". The full command should look like the following:

```
docker build -t api-service:latest production/
```

#### Run
To run a docker container with the image we created, execute the following command. This NodeJs application runs on a port 8088 by default within a container (as specified in the config/app*.json). You need to expose that port outside of a container using -p parameter.

```
docker run -p 8088:8088 api-service:latest
```

To learn more about dockerizing Node.js app, refer to this [page](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).
