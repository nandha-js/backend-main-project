import User from '../models/User.js';
import Agent from '../models/Agent.js';
import Property from '../models/Property.js';

// GET dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAgents = await Agent.countDocuments();
    const totalProperties = await Property.countDocuments();

    res.status(200).json({
      success: true,
      data: { totalUsers, totalAgents, totalProperties },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('Get all agents error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE agent
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Delete agent error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name email');
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('Get all properties error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
