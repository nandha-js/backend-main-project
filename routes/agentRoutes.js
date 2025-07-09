import express from "express";
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/agentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create agent (admin only) & Get all agents
router
  .route("/")
  .post(protect, authorize("admin"), createAgent)
  .get(protect, getAgents); // Anyone logged in can get agents (adjust if needed)

// Get, update, or delete agent by ID
router
  .route("/:id")
  .get(protect, getAgentById) // Protected route, no role restriction
  .put(protect, authorize("admin"), updateAgent)
  .delete(protect, authorize("admin"), deleteAgent);

export default router;
