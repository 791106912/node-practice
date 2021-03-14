const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const articals = [{title: 'artical1'}, {title: 'artical2'}, {title: 'artical3'}]

// get all articals
app.get('/articals', (req, res) => {
    res.send(articals)
})

// get the specficed id artical
app.get('/artical/:id', (req, res) => {
    res.send(articals[req.params.id])
})

// delete the specficed id artical
app.delete('/articals/:id', (req, res) => {
    const { id } = req.params
    if (articals[id] ) {
        // delete articals[id]
        res.send('success')
    } else {
        res.send('error, no such artical')
    }
})

// add the new artical
// because the post includes two parts：header and body, post needs the body parser.
// support request body encode as JSON
app.use(express.json())
// support request body encode as FORM
app.use(express.urlencoded({extended: true}))

app.post('/artical', (req, res) => {
    console.log(req)
    const artical = {title: req.body.title}
    articals.push(artical)
    res.send(articals)
})
app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`)
})