var express = require('express');
var router = express.Router();

exports.login = (req, res) => {
  res.render('login', {
    title: 'Login'
  })
}

exports.register = (req, res) => {
    res.render('register', {
      title: 'register'
    })
}

exports.submit = (req, res, next) => {
    console.log(req.body)
}