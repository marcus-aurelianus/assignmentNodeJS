# Interview Assignment (v2.0.1)

This package contains the base code for the interview assignment.<br>
You can add additional library that will aid you in fulfiling the requirements.
<br>
<br>
Please read through NodeJS_Assessment.pdf carefully before you attempt.

## available API

/api/healthcheck
/api/register
/api/reports/workload

## Illustration of register user record approach

In reality, a same class under same subject should have same amount of students regardless of teachers.
So whenever we are registering user record with the register API,
The register service will query from the database and update the students of other teachers.

## Prerequisites
- NodeJS v12.18.3
- Docker

<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | javascript | dir | This holds the base code which you should extend in order to fulfil the requirements |
| 2 | NodeJS_Assessment.pdf | file | The specification for the assignment |
| 3 | README.md | file | This file |
| 4 | school-administration-system.postman_collection.json | file | Postman script for uploading file |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | applicaiton | 3000 |

<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database.
```bash
npm start
```

<br>

### Running in watch mode
This will start the application in watch mode.
```bash
npm run start:dev
```

<br>

### Check local application is started
You should be able to call (GET) the following endpoint and get a 200 response

```
http://localhost:3000/api/healthcheck
```

<br>

## Extras

### Database
You can place your database migration scripts in javascript/database folder. <br>
It will be ran the first time MySQL docker container is first initialised. <br><br>
Please provide the instruction on how to initialise the database if you are not using the above method.

<br>

## FAQ

### Error when starting up
If you encounter the following error when running ```npm start```, it is due to the slow startup of your database container.<br>
Please run ```npm start``` again.

```
[server.js]	ERROR	SequelizeConnectionError: Connection lost: The server closed the connection.
[server.js]	ERROR	Unable to start application
```
