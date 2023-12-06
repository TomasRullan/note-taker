const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/Develop/public')));

require("./Develop/routes/api-routes.js")(app);
require("./Develop/routes/html-routes.js")(app);

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});