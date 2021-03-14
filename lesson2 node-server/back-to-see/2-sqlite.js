const express = require('express')
const sqlite3 = require('sqlite3').verbose()

/* 
    SQLite是一个进程内数据库，不需要在系统上安装一个后台运行的数据库，添加的数据都在创建的一个文件里
    sqlite3是它的一个流行的npm包
    db.all 获取多行数据
    db.get 获取单行数据
*/
// 创建数据库
const dbname = 'later.sqlite'
const db = new sqlite3.Database(dbname)
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
        (id integer primary key, title, content TEXT)
    `
    db.run(sql)
})

class Artical {
    static all(cb) {
        db.all('SELECT * FROM articles', cb)
    }
    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb)
    }
    static create(data, cb) {
        const sql = 'INSERT INFO articles(title, content) VALUES(? , ?)'
        db.run(sql, data.title, data.content, cb)
    }

    static delete(id, cb) {
        if(!id) return cb(new Error('Please provide an id'))
        db.run('DELETE FROM articles WHERE id = ?', id, cb)
    }
}

const app = express()

const port = process.env.PORT || 3000

app.get('/articals', (req, res) => {
    Artical.all((err, articals) => {
        if(err) return next(err)
        res.send(articals)
    })
})

app.listen(port, () => {
    console.log('start')
})