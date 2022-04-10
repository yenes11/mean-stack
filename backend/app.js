
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://deneme:V2y6raRWi99RvByW@cluster0.suy0r.mongodb.net/mean-stack?retryWrites=true")
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
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'We got the data',
      postId: createdPost._id
    });
  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    })

});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted!' });
  })

});

module.exports = app;
