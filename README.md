# auth-server
Authentication server made with NodeJS, Express and MongoDB. Encrypted passwords with one way hash and JWT validation.

Only have to change de .env folder, putting your json web token seed and your conexion code for mongoDB. Then, run the index.js in the nodejs folder into your server. 
Remember the URL path in the front end. If this change, you have to put the new url path in the angular project and rebuild it, and repleace it in the public folder of nodejs.
You can find the angular project in auth-app repository.
