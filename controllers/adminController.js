import User from '../models/User.js';
import Property from '../models/Property.js';
import Appointment from '../models/Appointment.js';
import Message from '../models/Message.js';

// 📊 Get full admin statistics for reports and charts
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalProperties = await Property.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalMessages = await Message.countDocuments();

    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const newUsers7Days = await User.countDocuments({
      createdAt: { $gte: last7Days },
    });

    const newProperties7Days = await Property.countDocuments({
      createdAt: { $gte: last7Days },
    });

    const propertyTypes = await Property.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    const propertiesPerAgent = await Property.aggregate([
      {
        $group: {
          _id: '$agent',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'agentDetails',
        },
      },
      { $unwind: '$agentDetails' },
      {
        $project: {
          agent: '$agentDetails.name',
          email: '$agentDetails.email',
          propertyCount: '$count',
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalAgents,
        totalAdmins,
        totalProperties,
        totalAppointments,
        totalMessages,
        newUsers7Days,
        newProperties7Days,
        propertyTypes,
        propertiesPerAgent,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: '❌ Failed to fetch admin statistics.',
    });
  }
};

// 📋 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Get all users error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 🗑️ Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 📋 Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('Get all agents error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 🗑️ Delete an agent
export const deleteAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    await agent.deleteOne();
    res.status(200).json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Delete agent error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 📋 Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name email');
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('Get all properties error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 🗑️ Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    await property.deleteOne();
    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
