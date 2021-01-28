const express = require('express');
const { dbConnection } = require('./configs/database');
const app = express();
const routes = require('./routes/routes');

dbConnection();

//routes
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`Database connecting, please wait...`);
});