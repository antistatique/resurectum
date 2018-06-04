module.exports = `
version: "3.3"
services:

    resurectum_server:
      image: node:6.14.2
      container_name: resurectum_server
      working_dir: /app
      command: bash -c "npm install && npm rebuild node-sass && ./node_modules/.bin/gulp serve"
      volumes:
        - .:/app
      ports:
        - "3000:3000"

    resurectum_builder:
      image: node:6.14.2
      container_name: resurectum_builder
      working_dir: /app
      command: bash -c "npm install && npm rebuild node-sass && ./node_modules/.bin/gulp build --production"
      volumes:
        - .:/app
`;
