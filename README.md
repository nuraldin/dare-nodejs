# DARE NODEJS

Test de assesment de nodejs.

Endpoints disponibles:
  - /login: Para obtener token de autenticacion. Se debe usar para acceder a los recursos.
  - /clients: informacion de clientes.
    - /clients: obtener todos los clientes.
    - /clients/:id: obtener cliente con id especifico.
    - /clients/:id/policies: obtener politicas de un cliente especifico.
  - /policies: informacion de politicas
    - /policies: todas las politicas del cliente que las pide.
    - /policies/:id: informacion de una politica especifica del cliente que la pide.


## Installation

Use npm to install packages and run scripts.

```bash
npm install 
```

## Usage

To start server locally first you need to set up a file with your credentials to let our api connect to insurance api. Create a file in a folder called **local_config** called **insurance_api_config.js** and fill it like this:

```javascript
const client_id = 'your id';
const client_secret = 'your secret';

export {
  client_id, 
  client_secret
};
```

Then, it is needed a .env file with a token secret to be able to authenticate incoming requests. Create the file and add the following:

```bash
TOKEN_SECRET='your-secret'
```
'your-secret' must be an at least 32 charaters longstring encrypted using the standard HSA 256 encryption.

Finally, you should be able to start the server, run the following npm script:

```bash
  npm run start:local
```

## Testing

Run the following script to run all tests:

```bash
  npm run test
```

