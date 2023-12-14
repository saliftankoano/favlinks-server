// Connect to postgress using the node-postgress package

const POOL = require('pg').Pool;

const pool = new POOL({
    user: 'salif',
    host: 'localhost',
    database: 'favlinks',
    password: 'wiam94532',
    port: 5432
})
console.log(pool);

//Create functions that will handle requests

// Create a link
const createLink = (req,res)=>{
    const name = req.body.name;
    const url = req.body.url;

    pool.query('INSERT INTO links(name, url) VALUES($1, $2)',[name, url], (error, result)=>{
        if(error){
            throw error;
        }
        console.log(req.body);
        res.send("Link successfully added :)")
    });
}
//Read Data in table links
const getLinks = (req,res)=>{
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    });
}
//UPDATE LINKS
const updateLink = (req,res)=>{
    const id = parseInt(req.params.id);
    // const name = req.body.name;
    // const url = req.body.url;
    const {name, url} = req.body;

    pool.query('UPDATE links SET name = $1, url = $2 WHERE id = $3',[name, url, id], (error, results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`Link with ID: ${id} was succesfully updated.`)
    });
}
//DELETE A LINK
const deleteLink = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM links WHERE id = $1',[id], (error, results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`Link ${id} successfully removed.`)
    });
}
//Export functions

module.exports ={
    getLinks,
    createLink,
    updateLink,
    deleteLink
}