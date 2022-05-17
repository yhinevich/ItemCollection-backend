
import {validationResult} from "express-validator";
import moment from "moment";
import ItemCollection from "../Models/ItemCollection.js";


class ItemController {

    async addItemCollection(req, res) {

        console.log(req.body)

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error adding the item collection", errors});
            }

            const itemCollection = new ItemCollection({
                ...req.body
            });

            await itemCollection.save();
            return res.json({message: "Item Collection has successfully registered"});
        } catch (e) {
            res.status(400).json({message: "Adding error"});
        }
    }

    async getAll(req, res) {
        console.log("ITEM СCLLECTION")
        try {
            const itemCollection = await ItemCollection.find();
            return res.json(itemCollection);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getAllWhereCollection(req, res) {
        console.log("ITEM СCLLECTION")
        try {
            const itemCollection = await ItemCollection.find({})
                                                        .where('collection_name')
                                                        .equals(req.params.collection_name);

            return res.json(itemCollection);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getByUserId(req, res) {
        console.log("USER ID COLL GET")
        console.log(req.params.id)
        try {
            const itemCollection = await ItemCollection.find({})
                .where('user_id')
                .equals(req.params.id);

            return res.json(itemCollection);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            if (!req.body._id) {
                res.status(400).json({message: "Id not specified"});
            }
            const updatedItemCollection = await ItemCollection.findByIdAndUpdate(req.body._id, req.body, {
                new: true,
            });
            console.log(updatedItemCollection)
            return res.json(updatedItemCollection);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            if (!req.params.id) {
                res.status(400).json({message: "Id not specified"});
            }
            const deletedItemCollection = await ItemCollection.findByIdAndDelete(req.params.id);
            return res.json(deletedItemCollection);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new ItemController();
