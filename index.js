const express = require('express');
const app = express();

const PORT = 5555;

const db = require('./queries');

const path = require('path');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Host react app as stastic files
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
})


//CRUD 

//CREATE
app.post('/api/links', db.createLink);
//READ
app.get('/api/links', db.getLinks);
//UPDATE
app.put('/api/links/', db.updateLink);
//DELETE
app.delete('/api/links/', db.deleteLink);


// Starting express on the PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}.`);
});
