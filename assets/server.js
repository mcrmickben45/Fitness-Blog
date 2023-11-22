const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = [
    { username: 'john_doe', password: 'password', firstName: 'John', lastName: 'Doe' },
    { username: 'jane_smith', password: 'password', firstName: 'Jane', lastName: 'Smith' },
];

const forumData = {
    posts: [
        {
            _id: '1',
            username: 'john_doe',
            content: 'This is a forum post.',
            dateTime: '2023-01-01 12:00:00',
            replies: [
                { _id: '1.1', username: 'jane_smith', content: 'Nice post!', dateTime: '2023-01-01 12:05:00' },
            ],
        },
        {
            _id: '2',
            username: 'jane_smith',
            content: 'Another post here.',
            dateTime: '2023-01-02 14:30:00',
            replies: [
                { _id: '2.1', username: 'john_doe', content: 'Thanks!', dateTime: '2023-01-02 14:35:00' },
            ],
        },
    ],
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: `Welcome back, ${user.firstName} ${user.lastName}!` });
    } else {
        res.json({ success: false, message: 'Invalid username or password.' });
    }
});

app.post('/register', (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        res.json({ success: false, message: 'Username already exists. Please choose another.' });
    } else {
        const newUser = { username, password, firstName, lastName };
        users.push(newUser);
        res.json({ success: true, message: 'Registration successful. You can now log in.' });
    }
});

app.get('/forum', (req, res) => {
    res.json(forumData);
});

app.post('/forum/post', (req, res) => {
    const { firstName, lastName, content } = req.body;
    const newPost = {
        _id: (Math.random() * 10000).toFixed(3), 
        username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        content,
        dateTime: getCurrentDateTime(),
        replies: [],
        firstName,
        lastName,
    };
    forumData.posts.push(newPost);
    res.json({ success: true, post: newPost });
});

app.post('/forum/reply', (req, res) => {
    const { postId, firstName, lastName, content } = req.body;
    const post = forumData.posts.find(p => p._id === postId);

    if (post) {
        const newReply = {
            _id: `${postId}.${post.replies.length + 1}`, 
            username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
            content,
            dateTime: getCurrentDateTime(),
            firstName,
            lastName,
        };
        post.replies.push(newReply);
        res.json({ success: true, reply: newReply });
    } else {
        res.json({ success: false, message: 'Post not found' });
    }
});

function getCurrentDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return now.toLocaleString('en-US', options);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
