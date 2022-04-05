
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://userenes:passcode2001@cluster0.suy0r.mongodb.net/mean-stack?retryWrites=true")
    .then(() => {
        console.log('connected succesfully');
    })
    .catch(() => {
        console.log('connection failed');
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message: 'We got the data'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: '1000000000',
            title: 'First NodeJS post',
            content: 'This is coming from the server'
        },
        {
            id: '2000000000',
            title: 'Second NodeJS post',
            content: 'This is also coming from the server'
        },
        {
            id: '3000000000',
            title: 'Third NodeJS post',
            content: 'Yes, this is from the server too'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;