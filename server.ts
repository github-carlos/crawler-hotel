require('dotenv').config();
const express = require('express');
const router = require('./src/application/routes/router.ts');

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use('/', router);
app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}`);
});
