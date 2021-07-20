# DARE NODEJS

This is an implementation of the Dare Node.js code assesment found here: https://dare-nodejs-assessment.herokuapp.com/assessment

After launching the server, the available endpoints are:
  - /login: Use this in order to obtain an access token. It must be used afterwards in each API call alongside the Authorization http header (Authorization: Bearer access_token) in order to access the other endpoints.
  - /clients: client information.
    - /clients: gets all clients.
    - /clients/id: gets a specific client.
    - /clients/id/policies: get policies of a specific client.
  - /policies: policies information.
    - /policies: all policies related to user who makes the request (identified via access token).
    - /policies/id: gets a specific policy related to user who makes the request (identified via access token).


All users with user role can only access their own resources, unless they have Admin role which lets them access all resources. Conveniently, I've set up on the postman collection a login test for an admin and a user.

## Installation

Use npm to install packages and run scripts.

```bash
npm install 
```

You must have latest Node.js version or greater. Below, is the one used to develop this solution.

```bash
node -v # v14.17.3 LTS
```

## Usage

To start server locally, first you need to set up a file with your credentials to let our api connect to insurance api. Create a folder on your top level folder (same level as src and test and package.json) called **local_config** and add in it a file called **insurance_api_config.js** and fill it like this:

```javascript
const clientId = 'your id';
const clientSecret = 'your secret';

export {
  clientId, 
  clientSecret
};
```

Then, it is needed a .env file with a token secret to be able to authenticate incoming requests. You may use one of your own or one I've created, you can access it through https://onetimesecret.com/secret/edy5grd0cckirawsmstpg3v97puac5f pass: capgemini, it will only let you see it once, so be careful or ask me to create it again, and add it to the provided .env file like this:

```bash
TOKEN_SECRET='your-secret'
```

Finally, you should be able to start the server, run the following npm script:

```bash
  npm run start:local
```

## TOKEN SECRET

You shouldn't worry about the secret as I'm sharing one with you but if you'd like to make it yourself, then 'your-secret' must be an at least 32 charaters long string encrypted using the standard HSA 256 encryption. 
You may generate it yourself by running in a node console:

```bash
> require('crypto').randomBytes(64).toString('hex') 
```

## Testing

Run the following script to run all tests:

```bash
  npm run test
```

You may also test endpoints by using the following postman collection via the button below.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12742692-f0b89d5f-ec15-4319-a2af-41f7e4345659?action=collection%2Ffork&collection-url=entityId%3D12742692-f0b89d5f-ec15-4319-a2af-41f7e4345659%26entityType%3Dcollection%26workspaceId%3D29de48db-6433-4a17-8a3f-0cdad1161a1b#?env%5Bdare%20environment%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

## Observations

- It could be used a better login implementation which I do not know of.
- Also, error handling could be improved.
- More thorough coverage is needed.
- More thorough linting is also needed.
