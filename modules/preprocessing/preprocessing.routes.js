const express = require('express');
const prepController = require('./preprocessing.controller');
const router = express.Router();

router.post('/p', prepController.RemovePunctuations);
router.post('/n', prepController.RemoveNumbers);
router.post('/t', prepController.TextToLowerCase);
router.post('/z', prepController.AnalyzeWord);
router.post('/s', prepController.StopWords);
router.post('/u', prepController.FindUniques);
router.post('/auto', prepController.FullAuto);

module.exports = router;