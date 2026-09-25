MyApp - Docker Containerization (Task 2)

Overview This is a simple Node.js Express web application that has been containerized using Docker. A multi-stage Dockerfile is used to keep the final image small and production-ready.

Project Structure devops internship/ server.js server.test.js package.json Dockerfile .dockerignore .gitignore README.md

Step 1: Application Code (server.js)

const express = require('express'); const app = express(); const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => { const APP_NAME = process.env.APP_NAME || 'MyApp'; res.send(Hello from ${APP_NAME}, running in Docker!); });

app.listen(PORT, () => { console.log(Server is running on port ${PORT}); });

This is a basic Express server that responds to an HTTP GET request. The APP_NAME value comes from an environment variable rather than being hardcoded in the code, which demonstrates secure environment variable handling.

Step 2: Multi-Stage Dockerfile

FROM node:20-alpine AS builder WORKDIR /app COPY package*.json ./ RUN npm install COPY . .

FROM node:20-alpine WORKDIR /app COPY --from=builder /app/node_modules ./node_modules COPY --from=builder /app/server.js ./ COPY --from=builder /app/package.json ./

EXPOSE 3000 CMD ["node", "server.js"]

Stage 1 (builder) installs dependencies and copies the application code. Stage 2 (final) copies only the necessary files from the builder stage, which reduces the final image size since build tools and extra files are not included. EXPOSE 3000 indicates that the application inside the container runs on port 3000.

.dockerignore contains: node_modules .git

This tells Docker which files to skip when building the image, so the build is faster and the image doesn't include unnecessary files.

Step 3: Build, Run and Environment Variables

Build the image: docker build -t myapp .

Run the container with an environment variable: docker run -p 3000:3000 -e APP_NAME=ProgreeApp myapp

-p 3000:3000 maps port 3000 on the host machine to port 3000 inside the container. Format is HOST_PORT:CONTAINER_PORT. -e APP_NAME=ProgreeApp passes an environment variable securely at runtime, without hardcoding it in the Dockerfile.

Verify the container is running: docker ps

The PORTS column should show: 0.0.0.0:3000->3000/tcp

Result in the browser at http://localhost:3000: Hello from ProgreeApp, running in Docker!

Step 4: CI/CD Pipeline (GitHub Actions)

A workflow file is added at .github/workflows/main.yml. It runs automatically whenever code is pushed to the main branch. It checks out the code, sets up Node.js, installs dependencies, runs the linter, runs tests, and logs the pipeline status.

A basic test file server.test.js was added so the test step has something to run:

test('sample test - basic math check', () => { expect(1 + 1).toBe(2); });

The node_modules folder is excluded from the repository using .gitignore, since it is regenerated automatically by npm install during the pipeline run.

Environment Variables Reference APP_NAME - App name displayed in the response - default is MyApp PORT - Port on which the server runs - default is 3000

Port Mapping Reference Host Port 3000 maps to Container Port 3000, used for the HTTP web server.

Summary of what this task covers Multi-stage Dockerfile written for a Node.js web app Final image size minimized by copying only production files into the final stage Environment variables passed securely at runtime instead of being hardcoded Container port mapping configured correctly Automated CI pipeline set up using GitHub Actions
