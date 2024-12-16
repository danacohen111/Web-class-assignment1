"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_controller_1 = __importDefault(require("../controllers/posts_controller"));
const router = express_1.default.Router();
//router.put("/:postId", postsController.getPostsBySender.bind(postsController));
router.get("/", posts_controller_1.default.getAll.bind(posts_controller_1.default));
router.get("/:id", posts_controller_1.default.getById.bind(posts_controller_1.default));
router.post("/", posts_controller_1.default.create.bind(posts_controller_1.default));
router.delete("/:id", posts_controller_1.default.deleteItem.bind(posts_controller_1.default));
exports.default = router;
//# sourceMappingURL=posts_route.js.map