const HskModel = require("../models/hskModel");
const { sendResponse } = require("../utils/response");

const getAllWords = async (req, res) => {
  try {
    const words = await HskModel.find();
    if (!words.length) {
      return sendResponse(res, 404, false, "No HSK1 words found");
    }
    sendResponse(res, 200, true, "HSK1 words retrieved successfully", words);
  } catch (error) {
    sendResponse(res, 500, false, "Server error", null, error.message);
  }
};

const createWord = async (req, res) => {
  try {
    const { word, pinyin, meaning } = req.body;
    if (!word || !pinyin || !meaning) {
      return sendResponse(res, 400, false, "Missing required fields");
    }
    const newWord = await HskModel.create({ word, pinyin, meaning });
    sendResponse(res, 201, true, "Word created successfully", newWord);
  } catch (error) {
    sendResponse(res, 500, false, "Server error", null, error.message);
  }
};

module.exports = { getAllWords, createWord };
