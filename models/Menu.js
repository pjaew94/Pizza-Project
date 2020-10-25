const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true
    },
    smallCost: {
        type: String
    },
    mediumCost: {
        type: String
    },
    largeCost: {
        type: String
    },
    smallCalories: {
        type: Number
    },
    mediumCalories: {
        type: Number
    },
    largeCalories: {
        type: Number
    },
})

module.exports = Menu = mongoose.model("menu", MenuSchema);