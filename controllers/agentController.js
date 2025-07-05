import User from '../models/User.js'; // Use User collection for agents
import Property from '../models/Property.js';

/**
 * @desc    Create a new agent
 * @route   POST /api/agents
 * @access  Private (admin only)
 */
export const createAgent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newAgent = await User.create({
      name,
      email,
      password,
      role: 'agent',
      phone // only if your User schema supports it
    });

    res.status(201).json({
      success: true,
      data: {
        _id: newAgent._id,
        name: newAgent.name,
        email: newAgent.email,
        role: newAgent.role
      }
    });
  } catch (error) {
    console.error('Create Agent Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all agent users
 * @route   GET /api/agents
 * @access  Private (agent/admin)
 */
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('Get Agents Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get a single agent profile by ID, with their properties
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
    console.error('Get Agent By ID Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
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

    if (req.body.email && req.body.email !== agent.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    agent.name = req.body.name ?? agent.name;
    agent.email = req.body.email ?? agent.email;

    const updatedAgent = await agent.save();
    res.status(200).json({ success: true, data: updatedAgent });
  } catch (error) {
    console.error('Update Agent Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
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
    console.error('Delete Agent Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
