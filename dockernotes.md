docker build -t my-pern-client-app .
docker run -p 5173:5173 my-pern-client-app
docker ps
docker stop <container_id_or_name>
docker kill <container_id_or_name>

docker-compose up --build

docker ps -a
docker container prune

docker images




client:
    image: dbalstjr16/my-fullstack-app-client:latest

// use volumes, build for development
// use image for deployment