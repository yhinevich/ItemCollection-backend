
import {validationResult} from "express-validator";
import moment from "moment";
import Item from "../Models/Item.js";


class ItemController {

    async addItem(req, res) {
        console.log(req.body)
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error adding the item", errors});
            }
            const {title,tag,description} = req.body;

            const candidate = await Item.findOne({title});
            if (candidate) {
                return res
                    .status(400)
                    .json({message: "This item is already exists"});
            }

            const item = new Item({
                ...req.body,
                addDate: moment().format("DD.MM.YYYY"),
            });
            await item.save();
            return res.json({message: "Item has successfully registered"});
        } catch (e) {
            res.status(400).json({message: "Adding error"});
        }
    }

    async getAll(req, res) {
        console.log("ITEMS")
        try {
            const items = await Item.find();

            return res.json(items);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getById(req, res) {
        console.log("ITEMS ID")
        try {
            const item = await Item.findById(req.params.id);

            return res.json(item);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            if (!req.body._id) {
                res.status(400).json({message: "Id not specified"});
            }
            const updatedItem = await Item.findByIdAndUpdate(req.body._id, req.body, {
                new: true,
            });
            console.log(updatedItem)
            return res.json(updatedItem);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            if (!req.params.id) {
                res.status(400).json({message: "Id not specified"});
            }
            const deletedItem = await Item.findByIdAndDelete(req.params.id);
            return res.json(deletedItem);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new ItemController();
