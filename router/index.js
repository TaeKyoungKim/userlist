var express = require('express')
var router = express.Router()
var mysql = require('mysql')
require('dotenv').config()

var db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME
})

router.get('/topic/add',(req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql,(err, result)=>{
        if(!err){
        // console.log(result)
        res.render('add',{topics:result})
    } else {
        console.log(err)
    }
    })
    
})

router.post('/topic/add' ,(req, res)=>{
    console.log(req.body);
    var title = req.body.title;
    var description = req.body.description;
    var autor = req.body.author;

    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
    var params = [title, description, autor]
    db.query(sql,params,(err, result)=>{
        if(!err){
            console.log("성공적으로 저장되었습니다.")
            res.redirect('/topic/add')
        } else {
            console.log(err)
        }
    })

})

router.get('/topic/:id' ,(req ,res)=>{
    console.log(req.params.id);
    var id = req.params.id
    var sql = 'SELECT * FROM topic WHERE id=?'
    db.query(sql,[id],(err, result)=>{
        if(!err){
            console.log(result)
            res.render('test',{topic:result})
        } else {
            console.log(err)
        }
    })
})


module.exports =router;

