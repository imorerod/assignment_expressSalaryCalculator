
const express = require('express');
const app = express();

app.use(express.static('server/public'));

app.listen(7500, function(){
    console.log('Yo!');
});