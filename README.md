## 🐳 Docker Support (Optional Testing Branches)

### 🚀 `feature/deployWithDocker`

This branch includes **production-ready Docker configurations** for deploying the app in a containerized environment:

- Uses **multi-stage builds** in the `Dockerfile` to reduce image size
- Includes `docker-compose.yml` for orchestrating containers in production
- Serves the frontend with **Nginx**
- Prepares backend and database services for deployment

**How to try it:**

```bash
git checkout feature/deployWithDocker
cd my-fullstack-app
docker-compose --build
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