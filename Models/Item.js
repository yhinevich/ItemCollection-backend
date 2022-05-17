import mongoose from "mongoose";

const Item = new mongoose.Schema({
    title: {type: String, required: true},
    tag: {type: String, required: true},
    description: {type: String, required: true},
    addDate: {type: String, required: true}
});

export default mongoose.model("Item", Item);
