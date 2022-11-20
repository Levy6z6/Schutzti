const mysql = require('mysql');
const colors = require('colors');

const database = mysql.createConnection({
    host:'localhost',
    database:'schutzi',
    user:'root',
    password:''
})
const connection = database.connect(function(error){
        error ? console.log(colors.red("Database connection error",error)) 
              : console.log(colors.blue("Database connection", database.threadId));
    })


module.exports = database;
// module.exports = usuarios;
//user
//123/*-+qwerty