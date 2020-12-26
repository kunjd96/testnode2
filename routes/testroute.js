const express = require('express');
const { getAllTestData, singleTestData, createTestData, updateTestData, deleteTestData, uploadFileTest } = require('../controllers/testcontroller');
const router = express.Router();

router.route('/').get(getAllTestData).post(createTestData);
router.route('/:id').get(singleTestData).put(updateTestData).delete(deleteTestData);


router.route('/:id/photo').put(uploadFileTest);


module.exports = router;