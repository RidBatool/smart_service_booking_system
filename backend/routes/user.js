
const router = require("express").Router();
const { userLogin, userCreateAcc } = require("../controllers/userController");

/* POST request sign-up route to handle a user account creation request */
router.post("/create-acc", userCreateAcc);

/* POST request login route to handle a user login request */
router.post("/login", userLogin);

module.exports = router;
