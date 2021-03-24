const Entry = require("../modal/entries")

exports.form = (req, res) => {
    // render post ejs 页面
    res.render('post', {title: 'Post'})
}

exports.submit = (req, res, next) => {
    const data = req.body.entry
    const entry = new Entry({
        username: 'test',
        title: data.title,
        body: data.body,
    })
    entry.save((err)=> {
        if(err) return next(err)
        res.redirect('/list')
    })
}

exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) return next(err)
        res.render('entries', {
            title: 'Entries',
            entries: entries,
        })
    })
}