## 🐳 Docker Support (Optional Testing Branches)

### 🔀 `feature/docker`

This branch provides a basic Docker setup for local development:

- Includes `Dockerfile` and `docker-compose.yml`
- Spins up both the client and server containers
- Connects to a local PostgreSQL container

**How to try it:**

```bash
git checkout feature/docker
cd my-fullstack-app
docker-compose up --build
```

#### 🛠️ Environment Setup

You must create a `.env` file in the **same directory** as `docker-compose.yml`.  
This file will be used to pass environment variables into the backend container.

**Example `.env` file:**

```env
# PostgreSQL Configuration
DB_HOST=db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key