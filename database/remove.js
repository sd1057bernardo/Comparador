const database = require('../database/db.json');
const fs = require('fs');
function remove(query){
    query.name = query.name.toLowerCase();
    try{
    if(query){
        for(row in database){
            if(database[row].name == query.name && database[row].bomdia == query.bomdia && database[row].queiroz == query.queiroz){
                queryResult = database[row];
                database.splice(row,1);
                console.table(database)
                obj = database;
                console.table(database);
                json = JSON.stringify(obj);
                fs.writeFile("./database/db.json", json, (err)=>{
                    if(err) throw err;
                    else { return true;}
                });
            }
        }
    }
    } catch(e){
        console.log(e)
        return false;
    }
}
module.exports = remove;