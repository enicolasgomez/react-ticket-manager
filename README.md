## ReactJS Ticket Manager demo project

FRONT END

As requested for position
https://www.getonbrd.com/empleos/programacion/dev-react-nodejs-senior-keiron-santiago

### Get Node server running on port 8080 first

Please visit:
https://github.com/enicolasgomez/nodejs-ticket-manager.git

### Git pull

```
git pull https://github.com/enicolasgomez/react-ticket-manager.git
```

### Set port

.env
```
PORT=8081
```

## Note:
Open `src/services/auth-header.js` and modify `return` statement for appropriate back-end (found in the tutorial).

```js
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': user.accessToken };             // for Node.js Express back-end
  } else {
    return {};
  }
}
```

## Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.

### Login

admin / admin
user / user 

