const mongoose = require("mongoose");
const Service = require("../models/serviceModel");

const canManageService = (user, providerId) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return providerId.toString() === user._id.toString();
};

const createService = async (req, res) => {
  try {
    if (!req.user || (req.user.role !== "agent" && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Only providers/admin can create services" });
    }

    const { title, description, price, duration } = req.body;
    const providerId = req.user._id;

    const service = await Service.create({
      title,
      description,
      price,
      duration,
      providerId,
    });

    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllServices = async (_req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch services" });
  }
};

const getMyServices = async (req, res) => {
  try {
    if (!req.user || (req.user.role !== "agent" && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Only providers/admin can view provider services" });
    }

    const query = req.user.role === "admin" ? {} : { providerId: req.user._id };
    const services = await Service.find(query).sort({ createdAt: -1 });
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch provider services" });
  }
};

const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch service" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (!canManageService(req.user, service.providerId)) {
      return res.status(403).json({ error: "Not authorized to update this service" });
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (!canManageService(req.user, service.providerId)) {
      return res.status(403).json({ error: "Not authorized to delete this service" });
    }

    await Service.findByIdAndDelete(id);
    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete service" });
  }
};

module.exports = {
  createService,
  getAllServices,
  getMyServices,
  getSingleService,
  updateService,
  deleteService,
};
