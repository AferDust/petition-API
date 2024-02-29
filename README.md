<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Installation
 - Copy this repository
 - Run this command:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode (use this command to run project)
$ npm run start:dev

# production mode
$ npm run start:prod
```
- open http://localhost:3000/ - you see swager page
- Register via "sing-up" endpoint and log in via "sing-in" endpoint, after which you will receive a JWT token (copy the access token). In the top right corner you can see the Authorize button, paste the access token in the input field. You can now use all endpoints. To use the admin endpoints (eg "create petition") log with these fields:

```
  login: aferdust
  password: z1x2c3v4b5
```  