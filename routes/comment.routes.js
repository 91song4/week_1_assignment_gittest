const router = require('express').Router();
const { auth_middleware } = require('../middlewares/auth-middleware')

const {
  createComments,
  getComments,
  updateCommnets,
  deleteComments,
} = require('../controllers/comment.controller.js');


// 댓글 생성 - comments/:postId - User
router.post('/comments/:postId', auth_middleware, createComments);

// 댓글 목록 조회 - comments/:postId - All
router.get('/comments/:postId', getComments);

// 댓글 수정 - comments/:postId - User
router.put('/comments/:commentId', auth_middleware, updateCommnets);

// 댓글 삭제 - comments/:postId - User
router.delete('/comments/:commentId', auth_middleware, deleteComments);

module.exports = router;