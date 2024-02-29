<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Installation
 - Copy this repository
 - Run this command:
```bash
$ docker-compose up
```


- Open http://localhost:3000/ - you see swager page
- Register via "sing-up" endpoint and log in via "sing-in" endpoint, after which you will receive a JWT token (copy the access token). In the top right corner you can see the Authorize button, paste the access token in the input field. You can now use all endpoints. To use the admin endpoints (eg "create petition") log with these fields:

```
  login: 
  password: 
```