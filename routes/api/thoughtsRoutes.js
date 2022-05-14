const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require('../../controllers/thoughtsController');

// /api/comments
router.route('/').get(getThoughts).post(createThought);

// /api/comments/:commentId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;