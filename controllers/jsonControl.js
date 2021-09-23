const express = require('express');
const database = require('../database/db.json');
const search = require('../database/search.js');
const write = require('../database/write.js');
const remove = require('../database/remove.js');
const router = express.Router();


router.get('/', (req,res )=>{
    res.json(database);
})
router.get('/search', (req, res)=>{
    query = req.body.search;
    if(search(query)){
        res.json(queryResult);
    } else {
        res.status('404').json({error : "Produto Não Encontrado!"})
    }
});
router.put('/', (req, res)=>{
    query = req.body;
    if(write(req.body)){
        res.json(query);
    } else {
        res.status('500');
    }

});
router.delete('/', (req, res)=>{
    query = req.body;
    if(remove(req.body)){
        res.json(query);
    } else {
        res.status('500');
    }
});
module.exports = app => app.use('/json', router);