const express = require('express');
const stopWerseController = require('./stopwerse.controller');
const router = express.Router();

router.post('/', stopWerseController.CreateWord);
router.get('/', stopWerseController.GetStopWerses);
router.put('/:id', stopWerseController.UpdateWordById);
router.delete('/:id', stopWerseController.DeleteWord);

module.exports = router;