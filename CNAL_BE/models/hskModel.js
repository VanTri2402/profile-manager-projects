const moogoose = require("mongoose");

const hskSchema = new moogoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  chinese: {
    type: String,
    required: true,
  },
  pinyin: {
    type: String,
    required: true,
  },
  vietnamese: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const HskModel = moogoose.model("wordHsks", hskSchema);
module.exports = HskModel;
