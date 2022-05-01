# A web app for generating JWT-based access tokens for Salesforce

Certain apps like postman and some web-based apps may not have the ability to read an x509 cert or sign a request with it. This web app can be used to generate a JWT token in such instances.

## Usage

To run locally, clone this repo and run `npm install && npm run`

Alternatively, you may deploy it to a PAAS provider of your choice, such as Heroku

The format of the request body is

```json
  {
    "isTest": true, //false for prod, true for sandbox,
    "privateKey": <certificate private key copy pasted as is>,
    "username": <user being impersonated>,
    "clientId": <clientid of the connected app>

  }
```

> Note: If you are using postman, it strips out newline characters from the private key. This application is capable of handling that.

Response format would be

```json
  {
    "access_token": "<accessToken>",
    "scope": "api",
    "instance_url": "<instanceurl>"
    "id": "<baseurl>/<orgid>/<userid>",
    "token_type": "Bearer"

  }
```

This app is currently hosted at [https://jwtsf.herokuapp.com/](https://jwtsf.herokuapp.com/) if you want to try it out. I recommend you do so using Postman
