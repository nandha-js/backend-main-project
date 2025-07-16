import User from '../models/User.js'; // Agents are stored in User model
import Property from '../models/Property.js';

/**
 * @desc    Create a new agent
 * @route   POST /api/agents
 * @access  Private (admin only)
 */
export const createAgent = async (req, res) => {
  try {
    const { name, email, password, phone, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const newAgentData = {
      name,
      email,
      password,
      role: 'agent',
    };

    if (phone) newAgentData.phone = phone;
    if (bio) newAgentData.bio = bio;

    const newAgent = await User.create(newAgentData);

    res.status(201).json({
      success: true,
      data: {
        _id: newAgent._id,
        name: newAgent.name,
        email: newAgent.email,
        phone: newAgent.phone,
        bio: newAgent.bio,
        role: newAgent.role,
      },
    });
  } catch (error) {
    console.error('❌ Create Agent Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all agents
 * @route   GET /api/agents
 * @access  Private (agent/admin)
 */
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('❌ Get Agents Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single agent by ID, with their properties
 * @route   GET /api/agents/:id
 * @access  Private
 */
export const getAgentById = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' }).select('-password');

    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    const properties = await Property.find({ agent: agent._id });

    res.status(200).json({
      success: true,
      data: {
        agent,
        properties,
      },
    });
  } catch (error) {
    console.error('❌ Get Agent By ID Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an agent profile
 * @route   PUT /api/agents/:id
 * @access  Private (admin only)
 */
export const updateAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });

    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    // Check for email uniqueness excluding current agent
    if (req.body.email && req.body.email !== agent.email) {
      const emailExists = await User.findOne({ email: req.body.email, _id: { $ne: agent._id } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }

    // Update fields if provided
    agent.name = req.body.name ?? agent.name;
    agent.email = req.body.email ?? agent.email;
    agent.phone = req.body.phone ?? agent.phone;
    agent.bio = req.body.bio ?? agent.bio; // ✅ Added bio update

    const updatedAgent = await agent.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedAgent._id,
        name: updatedAgent.name,
        email: updatedAgent.email,
        phone: updatedAgent.phone,
        bio: updatedAgent.bio,
        role: updatedAgent.role,
      },
    });
  } catch (error) {
    console.error('❌ Update Agent Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete an agent user
 * @route   DELETE /api/agents/:id
 * @access  Private (admin only)
 */
export const deleteAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });

    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    await agent.deleteOne();

    res.status(200).json({ success: true, message: 'Agent profile deleted' });
  } catch (error) {
    console.error('❌ Delete Agent Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
