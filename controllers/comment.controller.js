const { Post } = require('../models/post.js');

async function getComments(req, res) {
  try {
    const { postId } = req.params;
    const comments = await Post.findAll({ where: postId });
    console.log(comments);

    res.status(200).send({ data: comments });
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(400).send({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
}

module.exports = { getComments };