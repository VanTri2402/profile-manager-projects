const express = require("express");
const router = express.Router();
const { getAllWords, createWord } = require("../controllers/hskController");

router.get("/", getAllWords);
router.post("/", createWord);

module.exports = router;
