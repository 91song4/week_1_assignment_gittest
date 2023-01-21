const { sequelize, Post, Comment } = require('../models');

async function createComments(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { id: userId } = res.locals.user;
    const { comment: content } = req.body;

    if (Object.keys(req.body).length <= 0) {
      return res
        .status(412)
        .send({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(400).send({ errorMessage: "게시글이 없습니다" });
    }

    await Comment.create({ userId, postId, content });
    res.status(201).send({ message: "댓글을 작성하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "댓글 작성에 실패하였습니다." });
  }
}

async function getComments(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const [comments, metadata] = await sequelize.query(`
    select
      c.id,
      c.userId,
      u.nickname,
      c.content,
      c.createdAt,
      c.updatedAt
    from
      Comments as c
    left join Users as u on c.userId = u.id
    where
      c.postId = ${postId};
    `);


    res.status(200).send({ data: comments });
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(400).send({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
}

async function updateCommnets(req, res) {

}

async function deleteComments(req, res) {

}

module.exports = {
  createComments,
  getComments,
  updateCommnets,
  deleteComments,
};

