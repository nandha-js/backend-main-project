import User from '../models/User.js';
import Property from '../models/Property.js';

// @desc    Get dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totaladmin = await User.countDocuments({ role: 'admin' });
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const totalProperties = await Property.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totaladmin,
        totalAgents,
        totalProperties,
      },
    });
  } catch (error) {
    console.error('❌ Dashboard summary error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('❌ Get all users error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Delete user error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ @desc    Get all agents (from User collection)
export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('❌ Get all agents error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ @desc    Delete an agent (from User collection)
export const deleteAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    await agent.deleteOne();
    res.status(200).json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('❌ Delete agent error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name email');
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('❌ Get all properties error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    await property.deleteOne();
    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('❌ Delete property error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
