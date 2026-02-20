const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createService,
  getAllServices,
  getMyServices,
  getSingleService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.use(requireAuth);

router.get("/", getAllServices);
router.get("/my-services", getMyServices);
router.get("/:id", getSingleService);
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
