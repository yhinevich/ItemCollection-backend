import mongoose from "mongoose";

const ItemCollection = new mongoose.Schema({
    user_id: {type: String, required: true},
    item_id: {type: String, required: true},
    collection_name: {type: String, required: true}
});

export default mongoose.model("ItemCollection", ItemCollection);
