var express = require('express')
var router = express.Router()
var mysql = require('mysql')
require('dotenv').config()

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'o2'
})

router.get('/topic/add',(req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql,(err, result)=>{
        if(!err){
        console.log(result)
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
            res.redirect(`/topic/${result.insertId}`)
        } else {
            console.log(err)
        }
    })

})

router.get(['/topic','/topic/:id'] ,(req ,res)=>{
    var sql = "SELECT * FROM topic";
    db.query(sql, (err , results)=>{
        var id = req.params.id
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            db.query(sql,[id],(err , result)=>{
            if(!err){
                res.render('view' ,{topics: results, topic:result[0]})
            }else {
                console.log(err);
                res.status(500).send("Internal Server Error")
            }
        })
        } else {
            res.render('view', {topics:results , topic:undefined})
        }
        
    })
})


module.exports =router;

