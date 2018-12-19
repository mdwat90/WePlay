const router = require("express").Router();
const gameRoutes = require("./games");
const userRoutes = require("./users");

// Book routes
router.use("/games", gameRoutes);

// user routes
router.use("/users", userRoutes);



module.exports = router;
