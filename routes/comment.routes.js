const router = require('express').Router();
const { getComments } = require('../controllers/comment.controller.js');
const { auth_middleware } = require('../middlewares/auth-middleware')


router.get('/comments/:postId', getComments);

module.exports = router;