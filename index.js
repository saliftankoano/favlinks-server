const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5050;
const db = require('./queries');

const path = require('path');

//MIDDLEWARE
app.use(express.json());
app.use(cors());
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
app.put('/api/links/:id', db.updateLink);
//DELETE
app.delete('/api/links/:id', db.deleteLink);


// Starting express on the PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}.`);
});
