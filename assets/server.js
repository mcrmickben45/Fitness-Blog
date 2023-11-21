const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const users = [
  { username: 'user1', password: 'password1', firstName: 'John', lastName: 'Doe' },
];

const forumData = {
  posts: [],
  replies: [],
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/forum', (req, res) => {
  res.json(forumData);
});

app.post('/forum/post', (req, res) => {
  const { username, content } = req.body;

  const user = users.find(u => u.username === username);

  if (user) {
    const newPost = { username, content, timestamp: new Date(), replies: [] };
    forumData.posts.push(newPost);
    res.json({ success: true, post: newPost });
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

app.post('/forum/reply', (req, res) => {
  const { postId, username, content } = req.body;

  const user = users.find(u => u.username === username);

  if (user) {
    const reply = { username, content, timestamp: new Date() };
    const post = forumData.posts.find(p => p.id === postId);

    if (post) {
      post.replies.push(reply);
      forumData.replies.push(reply);
      res.json({ success: true, reply });
    } else {
      res.json({ success: false, message: 'Post not found' });
    }
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
