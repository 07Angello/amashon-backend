const express = require('express');
const app = express();

//routes
//app.use('./routes/routes.js');

app.listen(4000, () => {
    console.log('Server running on port 4000');
});