const express = require('express');
const router = express.Router();
const { getBoardsByUserEmail, getBoardById, createBoard, testApi, createStage, createCard, createUser, deleteBoard, editBoard, deleteStage, updateStage, deleteCard, updateCard, getAllStagesInBoard, getAllCardInStages, getCardDataById } = require('../controllers/controller'); // Import the createBoard function

// Route for creating a board
router.get('/boards/user/:userEmail', getBoardsByUserEmail);
router.get('/boards/:boardId', getBoardById);
router.post('/board/create', createBoard);
router.delete('/delete/boards/:boardId', deleteBoard);
router.put('/update/boards/:boardId', editBoard)

router.get('/board/:boardId/stages', getAllStagesInBoard);
router.post('/stages/create', createStage);
router.delete('/delete/stages/:stageId', deleteStage);
router.put('/update/stages/:stageId', updateStage);

router.get('/card/:boardId/cards', getAllCardInStages);
router.get('/card/:cardId', getCardDataById)
router.post('/cards/create', createCard);
router.delete('/delete/cards/:cardId', deleteCard);
router.put('/update/cards/:cardId', updateCard);

router.post('/user', createUser);

// Route for testing the API
router.get('/test', testApi);

module.exports = router;
