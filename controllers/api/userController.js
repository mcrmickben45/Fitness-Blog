const router = require('express').Router();
const { Post, User, Comment } = require('./../../models');

// Get all user /api/users 
router.get('/', async (req,res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_content', 'created_at'], 
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
            ],
        });

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});



router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.verifyPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect possword'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}); 

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// update with PUT /api/users/1
router.put('/:id', async (req, res) => {
    try {
        const dbUserData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            },
        });

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE /api/users/1
router.delete('/:id', async (req, res) => {
    try {
        const dbUserData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}); 

module.exports = router;