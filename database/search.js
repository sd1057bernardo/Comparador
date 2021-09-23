const database = require('../database/db.json');
function search(query) {
    query = query.toLowerCase();
    if(query){
        for(row in database){
            if(database[row].name == query){
                queryResult = database[row];
                return queryResult, row;
            }
        }
    } 
    return false;
}

module.exports = search;