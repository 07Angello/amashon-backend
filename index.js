const express = require('express');
const { dbConnection } = require('./configs/database');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

dbConnection();

app.use( cors() );
app.use( express.json() );

//routes
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`Database connecting, please wait...`);
});