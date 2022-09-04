const { application } = require("express");
const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts_controller");

router.get("/postsection", postController.postSection);

module.exports = router;
