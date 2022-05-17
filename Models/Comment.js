import mongoose from "mongoose";

const Comment = new mongoose.Schema({
    item_id: {type: String, required: true},
    user_id: {type: String, required: true},
    context: {type: String, required: true},
    addDate: {type: String, required: true}
});

export default mongoose.model("Comment", Comment);
