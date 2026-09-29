# DevOps Internship Project

This repository contains the work completed during the Progree DevOps Internship Program. It covers application containerization, automated CI/CD pipelines, and Kubernetes-based orchestration for a simple Node.js web application.

## Overview

A basic Node.js Express application is containerized using Docker, tested and validated automatically through a GitHub Actions pipeline, and deployed to a Kubernetes cluster with autoscaling, persistent storage, and ingress routing.

## Tasks Completed

**Task 1 — LinkedIn Announcement**
Shared the internship offer letter on LinkedIn with a caption and relevant hashtags.

**Task 2 — Docker Containerization**
Built a multi-stage Dockerfile to containerize the application, with secure environment variable handling and port mapping. See `README_1.md` for full details.

**Task 3 — CI/CD Pipeline**
Set up a GitHub Actions workflow (`.github/workflows/main.yml`) that automatically installs dependencies, runs a linter, and runs tests on every push to `main`.

**Task 4 — Kubernetes Orchestration**
Deployed the application to a local Kubernetes cluster (Minikube) using:
- `deployment.yaml` — 2 replica pods for high availability
- `service.yaml` — exposes the app via NodePort
- `pvc.yaml` — persistent storage (1Gi)
- `ingress.yaml` — domain-based routing (`myapp.local`)
- Horizontal Pod Autoscaler configured to scale between 2 and 5 pods based on CPU usage

## Tech Stack

Node.js, Express, Docker, GitHub Actions, Kubernetes, Minikube, Jest

## Project Structure

```
devops-internship/
├── .github/workflows/main.yml   # CI/CD pipeline
├── server.js                    # Application code
├── server.test.js               # Unit test
├── Dockerfile                   # Multi-stage Docker build
├── .dockerignore
├── .gitignore
├── deployment.yaml               # Kubernetes Deployment
├── service.yaml                  # Kubernetes Service
├── pvc.yaml                      # Persistent Volume Claim
├── ingress.yaml                  # Ingress configuration
└── package.json
```

## Running Locally

```bash
npm install
node server.js
```

## Running with Docker

```bash
docker build -t myapp .
docker run -p 3000:3000 -e APP_NAME=ProgreeApp myapp
```

## Deploying to Kubernetes (Minikube)

```bash
minikube start --driver=docker
minikube image load myapp
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f pvc.yaml
kubectl apply -f ingress.yaml
kubectl autoscale deployment myapp-deployment --cpu-percent=50 --min=2 --max=5
```
