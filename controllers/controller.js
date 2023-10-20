const board = require('../models/board');
const user = require('../models/user');
const stage = require('../models/stages');
const card = require('../models/card');
const mongoose = require('mongoose');

// Function to fetch all boards
const getBoardsByUserEmail = async (req, res, next) => {
  const { userEmail } = req.params; // Extract userEmail from the route parameter

  try {
    // Find boards with matching username (userEmail)
    const userBoards = await board.find({ userEmail: userEmail });

    if (userBoards.length === 0) {
      res.status(404).json({ message: 'No boards found for the specified userEmail' });
    } else {
      res.status(200).json({ message: 'Boards fetched successfully', boards: userBoards });
    }
  } catch (error) {
    console.error('Error fetching boards by userEmail:', error.message);
    res.status(500).json(error.message);
  }
};

const getBoardById = async (req, res, next) => {
  const boardId = req.params.boardId;

  try {
    // Find the board by _id
    const boardData = await board.findById(boardId);

    if (!board) {
      res.status(404).json({ message: 'Board not found' });
    } else {
      res.status(200).json({ message: 'Board fetched successfully', boardData });
    }
  } catch (error) {
    console.error('Error fetching board by _id:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to create a new board
const createBoard = async (req, res, next) => {
  try {
    let stagesData = req.body.stages;
    const newBoard = new board({
      boardTitle: req.body.boardTitle,
      visibility: req.body.visibility,
      desc: req.body.desc,
      userEmail: req.body.userEmail,
      background: req.body.background,
      stages: stagesData,
    });
    const savedBoard = await newBoard.save();

    res.status(201).json({ message: 'Board created successfully', boardId: savedBoard._id });
  } catch (error) {
    console.error('Error creating board:', error.message);
    res.status(500).json(error.message);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    // Check if the board exists
    const existingBoard = await board.findById(boardId);

    if (!existingBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Perform the board deletion using deleteOne()
    await board.deleteOne({ _id: boardId });

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to edit a board
const editBoard = async (req, res, next) => {
  try {
    const boardId = req.params.boardId; // Get the stage ID from the route parameters
    const updates = req.body; // Get the updates from the request body

    // Update the board using findByIdAndUpdate
    const updatedBoard = await board.findByIdAndUpdate(
      boardId,
      { $set: updates }, // Use the $set operator to update specific fields
      { new: true } // Return the updated stage
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'board not found' });
    }

    res.status(200).json({ message: 'Board updated successfully', board: updatedBoard });
  } catch (error) {
    console.error('Error updating stage:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to fetch all stages within a specific board
const getAllStagesInBoard = async (req, res, next) => {
  try {
    const boardId = req.params.boardId; // Get the board ID from the route parameters

    // Find all stages within the specified board
    const stagesInBoard = await stage.find({ boardId: boardId });

    res.status(200).json({ message: 'All stages in the board fetched successfully', stages: stagesInBoard });
  } catch (error) {
    console.error('Error fetching stages in the board:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to create a new stage
const createStage = async (req, res, next) => {
  try {
    // Create a new stage document
    const boardData = req.body.boardId;
    const newStage = new stage({
      boardId: boardData,
      title: req.body.title,
      visibility: req.body.visibility,
      userEmail: req.body.userEmail,
      desc: req.body.desc,
      priority: req.body.priority,
      important: req.body.important,
    });

    console.log(boardData)

    // Save the new stage to the database
    const savedStage = await newStage.save();

    res.status(201).json({ message: 'Stage created successfully', stage: savedStage });
  } catch (error) {
    console.error('Error creating stage:', error.message);
    res.status(500).json(error.message);
  }
};

const deleteStage = async (req, res, next) => {
  try {
    const { stageId } = req.params;
    // Now, you can also delete the stage document itself if needed
    await stage.findByIdAndRemove(stageId);

    res.status(200).json({ message: 'Stage deleted successfully' });
  } catch (error) {
    console.error('Error deleting stage:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to update a stage
const updateStage = async (req, res, next) => {
  try {
    const stageId = req.params.stageId; // Get the stage ID from the route parameters
    const updates = req.body; // Get the updates from the request body

    // Update the stage using findByIdAndUpdate
    const updatedStage = await stage.findByIdAndUpdate(
      stageId,
      { $set: updates }, // Use the $set operator to update specific fields
      { new: true } // Return the updated stage
    );

    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.status(200).json({ message: 'Stage updated successfully', stage: updatedStage });
  } catch (error) {
    console.error('Error updating stage:', error.message);
    res.status(500).json(error.message);
  }
};


// Function to fetch all stages within a specific board
const getAllCardInStages = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    console.log(boardId)
    const cardsInBoard = await card.find({ boardId: boardId });

    res.status(200).json({ message: 'All cards in the stages fetched successfully', cards: cardsInBoard });
  } catch (error) {
    console.error('Error fetching cards in the board:', error.message);
    res.status(500).json(error.message);
  }
};

const getCardDataById = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const cardData = await card.findById(cardId);

    if (!cardData) {
      // If the card with the given ID is not found, return a 404 status code
      return res.status(404).json({ message: 'Card not found' });
    }

    // If the card is found, send its data as a JSON response
    res.status(200).json({ message: 'Card data fetched successfully', cardData });
  } catch (error) {
    console.error('Error fetching card data by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const createCard = async (req, res, next) => {
  try {


    // Create a new card document
    const newCard = new card({
      stageId: req.body.stageId,
      boardId: req.body.boardId,
      title: req.body.title,
      desc: req.body.desc,
      visibility: req.body.visibility,
      userEmail: req.body.userEmail,
      priority: req.body.priority,
    });

    // Save the new card to the database
    const savedCard = await newCard.save();

    res.status(201).json({ message: 'Card created successfully', card: savedCard });
  } catch (error) {
    console.error('Error creating card:', error.message);
    res.status(500).json(error.message);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId; // Get the card ID from the route parameters

    // Use Card.findByIdAndRemove to delete the card by ID
    const deletedCard = await card.findByIdAndRemove(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully', card: deletedCard });
  } catch (error) {
    console.error('Error deleting card:', error.message);
    res.status(500).json(error.message);
  }
};

// Function to update a card
const updateCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    console.log(cardId)
    const updatedCardData = {
      stageId: req.body.stageId,
      boardId: req.body.boardId,
      title: req.body.title,
      desc: req.body.desc,
      visibility: req.body.visibility,
      userEmail: req.body.userEmail,
      priority: req.body.priority,
    }; // Get the card ID from the route parameters
    // Get the updates from the request body

    // Update the card using findByIdAndUpdate with $set
    const updatedCard = await card.findByIdAndUpdate(
      cardId,
      { $set: updatedCardData }, // Use the $set operator to update specific fields
      { new: true } // Return the updated card
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card updated successfully', card: updatedCard });
  } catch (error) {
    console.error('Error updating card:', error.message);
    res.status(500).json(error.message);
  }
};


// Function to create a new user
const createUser = async (req, res, next) => {
  try {
    const boardData = req.body.boards
    const newUser = new user({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      userProfile: req.body.userProfile,
      boards: boardData
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json(error.message);
  }
};


// Function for testing the API
const testApi = async (req, res, next) => {
  res.status(200).json('Welcome to my API');
};

module.exports = { createBoard, testApi, createStage, createCard, createUser, deleteBoard, editBoard, deleteStage, updateStage, deleteCard, updateCard, getBoardsByUserEmail, getBoardById, getAllStagesInBoard, getAllCardInStages, getCardDataById };
