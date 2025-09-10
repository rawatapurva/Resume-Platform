const express = require('express');
const router = express.Router();
const {
createResume,
getResumes,
updateResume,
deleteResume,
getResumeById,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);
router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);


module.exports = router;