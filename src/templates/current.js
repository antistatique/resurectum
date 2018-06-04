module.exports = `
version: "3.3"
services:

    resurectum_server:
      image: kkarczmarczyk/node-yarn:8.0
      container_name: resurectum_server
      working_dir: /app
      command: bash -c "yarn && yarn start"
      volumes:
        - .:/app
      ports:
        - "3000:3000"

    resurectum_builder:
      image: kkarczmarczyk/node-yarn:8.0
      container_name: resurectum_builder
      working_dir: /app
      command: bash -c "yarn && yarn build"
      volumes:
        - .:/app

`;