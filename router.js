import {Router} from "express";
import UserController from "./Contollers/UserController.js";
import {check} from "express-validator";
import ItemController from "./Contollers/ItemController.js";
import ItemCollectionController from "./Contollers/ItemCollectionController.js";
import CommentController from "./Contollers/CommentController.js";

const router = new Router();

router.post(
    "/signup",
    [
        check("email", "Incorrect email").isEmail(),
        check("name", "at least 2 characters must be in the name").isLength({
            min: 2,
        }),
        check("password", "at least 1 character must be in the password").isLength({
            min: 1,
        }),
    ],
    UserController.register
);
router.post("/signin", UserController.login);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.put("/users", UserController.update);
router.delete("/users/:id", UserController.delete);

router.post("/item", ItemController.addItem);
router.get("/items", ItemController.getAll);
router.get("/items/:id", ItemController.getById);
router.put("/item", ItemController.update);
router.delete("/items/:id", ItemController.delete);

router.post("/item-collection", ItemCollectionController.addItemCollection);
router.get("/item-collections", ItemCollectionController.getAll);
router.get("/item-collections/:id", ItemCollectionController.getByUserId);
router.get("/item-collections/:collection_name", ItemCollectionController.getAllWhereCollection);
router.put("/item-collection", ItemCollectionController.update);
router.delete("/items-collection/:id", ItemCollectionController.delete);

router.post("/comment", CommentController.addComment);
router.get("/comments", CommentController.getAll);
router.get("/commentss/:item_id", CommentController.getAllWhereItemId);//by id check
router.put("/comment", CommentController.update);
router.delete("/comments/:id", CommentController.delete);

export default router;
