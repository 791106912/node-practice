var express = require('express');
const User = require('../modal/user');
var router = express.Router();

exports.login = (req, res) => {
  res.render('login', {
    title: 'Login'
  })
}

exports.submit = (req, res) => {
  const data = req.body.user
  User.auth(data.name, data.pass, (err, user) => {
    if (err) return next(err)
    if (user) {
      console.log(req.session)
      req.session.uid = user.id
      res.redirect('/list')
    } else {
      console.log('not  true')
      res.redirect('/login')
    }
  })
}

exports.register = (req, res) => {
    res.render('register', {
      title: 'register'
    })
}

exports.save = (req, res, next) => {
    const user = new User(req.body.user)
    user.save(err => {
      if(err) return next(err)
      res.redirect('/login')
    })
    
}