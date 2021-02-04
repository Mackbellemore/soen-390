# Software Engineering Team Design Project
## Reports

[Link to Sprint 1 Report](docs/sprint1_report.md)

## Getting started with development

Clone the GitHub repository and create your own branch using the auto-generated ClickUp naming convention.

### Requirements

- Node.js v15+
- Docker v20+

### Docker

All containers can quickly be started for development with `docker-compose up --build` or `make run` from the project root directory.

As you make changes, the projects will recompile/rebuild and you will be able to see the changes.

### Making code changes

Husky is set up at the root of the project.

Husky will run Prettier before every commit (pre-commit hook). This will ensure that we have consistent code style across all developers.

### Client

If you don't want to use Docker for development (and use your own host environment), then you can simply run `npm install` to install the dependencies, followed by `npm run dev` to start the project for development purposes.

The project will be available at <http://localhost:3000>

### Server

First install the dependencies with `npm install` inside of server.

Then run `npm run dev` and the project will be available at <http://localhost:9090>

### Debugging the Server using Visual Studio Code

1. Uncomment the `command: debug` line in the server part of the docker-compose.yml file at the root of the project. docker-compose.yml should look like this:

```yml
volumes:
      - ./server:/code
      - /code/node_modules
    depends_on:
      - mongo
    command: debug
```

2. Rebuild the project using `make run-server` or `docker-compose up --build server`

3. Start by opening the the server folder in its on VS Code window.

4. In VS code on the debug tab click on "create launch.json" or click on the gear icon. Replace the contents with the contents of `launch.json` at the root of this project.

3. Hit F5 or run the `Docker: Attach to Node server` configuration debugger, you should now be able to set breakpoints.

### MongoDB

A local MongoDB container is used for development purposes. For convenience, mongo-express is also provided at <http://localhost:8081> to explore the database visually.

## Team

| Name                | ID       |
| ------------------- | -------- |
| Gordon Pham-Nguyen  | 40018402 |
| Naasir Jusab        | 40057665 |
| Mackenzie Bellemore | 40062494 |
| Sujan Saravanamuthu | 40044870 |
| David Liang         | 40092433 |
| Tiffany Zeng        | 40063115 |
|                     |          |
|                     |          |
