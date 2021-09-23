const database = require('../database/db.json');
const search = require('../database/search.js')
const fs = require('fs');
 function write(query){
     query.name = query.name.toLowerCase();
     query.bomdia = parseFloat(query.bomdia);
     query.queiroz = parseFloat(query.queiroz);
     query.date = new Date().toDateString();
    try{
        leng = database.length;
        if(search(query.name)){
            database[row].name = query.name;
            database[row].bomdia = parseFloat(query.bomdia);
            database[row].queiroz = parseFloat(query.queiroz);
            database[row].date = new Date().toDateString();
        } else {
            database.splice(leng,0, query);
        }
        obj = database;
        console.table(database);
        json = JSON.stringify(obj);
        fs.writeFile("./database/db.json", json, (err)=>{
            if(err) throw err;
            else { return true;}
        });
        return false;
    } catch(e){
        console.log(e)
        return false;
    }
}
module.exports = write;