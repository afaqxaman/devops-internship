# MyApp - Docker Containerization (Task 2)

## Overview
Ye ek simple Node.js Express web application hai jise Docker ke zariye containerize kiya gaya hai. Multi-stage Dockerfile use kiya gaya hai taake final image ka size chota rahe aur production-ready ho.

---

## Project Structure
```
devops internship/
  server.js
  package.json
  Dockerfile
  .dockerignore
  README.md
```

---

## Step 1: Application Code (server.js)

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const APP_NAME = process.env.APP_NAME || 'MyApp';
  res.send(`Hello from ${APP_NAME}, Docker mein chal raha hai!`);
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} par`);
});
```

**Explanation:** Ye ek basic Express server hai jo ek HTTP GET request ka jawab deta hai. `APP_NAME` environment variable se aata hai, isliye code ke andar hardcode nahi hai — ye secure environment variable handling ka example hai.

---

## Step 2: Multi-Stage Dockerfile

```dockerfile
# ---- Stage 1: Builder ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ---- Stage 2: Final lightweight image ----
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "server.js"]
```

**Explanation:**
- **Stage 1 (builder):** Dependencies install karta hai aur code copy karta hai.
- **Stage 2 (final):** Sirf zaroori files (node_modules, server.js, package.json) builder se copy karta hai — is se image ka size kaafi kam ho jata hai, kyunki build tools aur extra files final image mein nahi jatin.
- **EXPOSE 3000:** Batata hai ke container ke andar app port 3000 par chal rahi hai.

### .dockerignore
```
node_modules
.git
```
**Explanation:** Ye file batati hai Docker ko konsi cheezein image build karte waqt ignore karni hain (taake unnecessary files image mein na jayen aur build fast ho).

---

## Step 3: Build, Run & Environment Variables

### Image build karna:
```bash
docker build -t myapp .
```

### Container run karna (environment variable ke sath):
```bash
docker run -p 3000:3000 -e APP_NAME=ProgreeApp myapp
```

**Explanation:**
- `-p 3000:3000` → Host machine ka port 3000 ko container ke port 3000 se map karta hai (Port Routing Map). Format: `HOST_PORT:CONTAINER_PORT`.
- `-e APP_NAME=ProgreeApp` → Environment variable ko secure tareeqe se runtime par pass karta hai, Dockerfile mein hardcode kiye bagair.

### Verify karna container chal rahi hai:
```bash
docker ps
```
Expected output mein PORTS column mein dikhna chahiye:
```
0.0.0.0:3000->3000/tcp
```

### Result (Browser mein `http://localhost:3000`):
```
Hello from ProgreeApp, Docker mein chal raha hai!
```

---

## Environment Variables Reference

| Variable   | Description                          | Default   |
|------------|---------------------------------------|-----------|
| APP_NAME   | App ka naam jo response mein dikhta hai | MyApp   |
| PORT       | Server konse port par chalega         | 3000      |

## Port Mapping Reference

| Host Port | Container Port | Purpose          |
|-----------|-----------------|-------------------|
| 3000      | 3000            | HTTP web server   |

---

## Key Learnings (Task 2 Requirements Covered)
- ✅ Multi-stage Dockerfile authored for a Node.js web app
- ✅ Final image footprint minimized (only production files in final stage)
- ✅ Environment variables mapped securely (passed via `-e` flag, not hardcoded)
- ✅ Functional container port routing defined (`-p` flag)
