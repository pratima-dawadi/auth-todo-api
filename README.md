# TodoApi with Authentication

* Simple Todo API built with Node.js and Express.js, with added authentication functionality
* Allows users to login and perform CRUD operations on a todo list

## API Endpoints

### Users
- `GET /users`: Get the list of the users
- `GET /users/{id}`: Get the list of the users by ID
- `POST /users`: Add new user


### Authentication
- `POST /login`: Authenticate a user and obtain an access token and refresh token
- `POST /refresh`: Refresh the access token using a refresh token

### Todos (Requires authentication and perform the tasks for particular user)
- `GET /todo`: Retrieve all todo lists
- `GET /todo/{id}`: Retrieve a specific todo by ID
- `POST /todo`: Add a new todo
- `PUT /todo/{id}`: Update an existing todo by ID
- `DELETE /todo/{id}`: Delete a todo by ID

## Run Locally

### Clone the project

```bash
git clone https://github.com/pratima-dawadi/auth-todo-api.git
```

### Change project directory
```bash
cd auth-todo-api
```

### Install dependencies
```bash
npm install
```

### Run project
```bash
npm run
```
## Docker Image
https://hub.docker.com/repository/docker/dawadipratima/authtodoapi/general
