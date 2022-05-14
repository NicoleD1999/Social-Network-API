const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require('../../controllers/thoughtsControllers');

// /api/comments
router.route('/').get(getThoughts).post(createThought);

// /api/comments/:commentId
router.route('/:thoughtId').get(getSingleThought);

// router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;