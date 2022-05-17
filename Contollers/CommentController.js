
import {validationResult} from "express-validator";
import moment from "moment";
import Comment from "../Models/Comment.js";
import ItemCollection from "../Models/ItemCollection.js";


class CommentController {

    async addComment(req, res) {
        console.log(req.body)
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error adding the item", errors});
            }

            const comment = new Comment({
                ...req.body,
                addDate: moment().format("DD.MM.YYYY"),
            });
            await comment.save();
            return res.json({message: "Item has successfully registered"});
        } catch (e) {
            res.status(400).json({message: "Adding error"});
        }
    }

    async getAll(req, res) {
        console.log("COMMMMMNET")
        try {
            const comments = await Comment.find();

            return res.json(comments);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getAllWhereItemId(req, res) {
        
        console.log("Comments " + req.params.item_id)
        try {
            const comments = await Comment.find({})
                .where('item_id')
                .equals(req.params.item_id);
            return res.json(comments);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getById(req, res) {
        console.log("ITEMS ID")
        try {
            const comment = await Comment.findById(req.body._id);
            return res.json(comment);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            if (!req.body._id) {
                res.status(400).json({message: "Id not specified"});
            }
            const updatedComment = await Comment.findByIdAndUpdate(req.body._id, req.body, {
                new: true,
            });
            console.log(updatedComment)
            return res.json(updatedComment);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            if (!req.params.id) {
                res.status(400).json({message: "Id not specified"});
            }
            const deletedComments = await Comment.findByIdAndDelete(req.params.id);
            return res.json(deletedComments);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new CommentController();
