const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const articals = [{title: 'artical1'}, {title: 'artical2'}, {title: 'artical3'}]

// 响应静态文件请求，通过express.static将文件注册到适当地位置。
app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
)

// 可以用res.format 通过 请求头的Accept来判断用哪种返回模式。
// res.render 指定渲染模板 和传入数据来指定ejs模板
app.get('/articals', (req, res) => {
    res.format({
        'text/html': () => {
            res.render('articals.ejs', {articals: articals})
        },
        'application/json': () => {
            res.send(articals)
        }
    })
})

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`)
})