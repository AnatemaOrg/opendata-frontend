const express = require('express');

const app = express();

app.use(express.static('./dist/opendata-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/opendata-frontend/'}),
);

app.listen(process.env.PORT || 8080);