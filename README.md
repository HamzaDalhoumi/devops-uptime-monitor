# DevOps Uptime Monitor

> A full-stack uptime monitoring application with a CI/CD pipeline powered by Jenkins.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

---

## Overview

DevOps Uptime Monitor is a real-time service availability tracker that allows engineers to monitor the health and uptime of web services. The project combines a TypeScript backend with a responsive frontend dashboard and integrates a full CI/CD pipeline via Jenkins for automated build and deployment.

## Features

- Real-time uptime tracking for monitored endpoints
- Visual dashboard displaying service status and availability history
- Automated build and deployment pipeline via Jenkinsfile
- Clean separation between backend logic and frontend presentation

## Project Structure

```
devops-uptime-monitor/
├── backend/                  # API server and monitoring logic
├── frontend/
│   └── uptime-monitor-frontend/  # Dashboard UI
└── Jenkinsfile               # CI/CD pipeline definition
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | TypeScript, HTML, CSS |
| Backend | TypeScript / JavaScript |
| CI/CD | Jenkins |

## Getting Started

### Prerequisites

- Node.js (v18+)
- Jenkins (for CI/CD)

### Installation

```bash
# Clone the repository
git clone https://github.com/HamzaDalhoumi/devops-uptime-monitor.git
cd devops-uptime-monitor

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/uptime-monitor-frontend
npm install
```

### Running Locally

```bash
# Start the backend
cd backend
npm start

# Start the frontend (in a separate terminal)
cd frontend/uptime-monitor-frontend
npm start
```

## CI/CD Pipeline

The project includes a `Jenkinsfile` at the root level defining an automated pipeline:

1. **Build** — Install dependencies and compile TypeScript
2. **Test** — Run automated test suites
3. **Deploy** — Deploy to the target environment

---

*Built by [Hamza Dalhoumi](https://github.com/HamzaDalhoumi)*
