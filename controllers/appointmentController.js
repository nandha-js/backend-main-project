import Appointment from '../models/Appointment.js';
import Property from '../models/Property.js';

/**
 * @desc    Book an appointment
 * @route   POST /api/appointments/:propertyId
 * @access  Private (User only)
 */
export const createAppointment = async (req, res) => {
  const { date, time, message } = req.body;
  const { propertyId } = req.params;

  if (!date || !time || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (date, time, message) are required.',
    });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found.' });
    }

    if (req.user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'Only users can book appointments.' });
    }

    const appointment = await Appointment.create({
      property: propertyId,
      user: req.user.id,
      date,
      time,
      message,
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Create Appointment Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all appointments
 * @route   GET /api/appointments
 * @access  Private (Admin only)
 */
export const getAppointments = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  try {
    const appointments = await Appointment.find()
      .populate('property', 'title agent')
      .populate('user', 'name email');

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get Appointments Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get single appointment
 * @route   GET /api/appointments/:id
 * @access  Private (Admin or Agent owner of the property)
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('property', 'agent title')
      .populate('user', 'name email');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwnerAgent =
      req.user.role === 'agent' &&
      appointment.property?.agent?.toString() === req.user.id;

    if (!isAdmin && !isOwnerAgent) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Get Appointment By ID Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Delete an appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private (Admin or Agent owner of the property)
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('property', 'agent');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwnerAgent =
      req.user.role === 'agent' &&
      appointment.property?.agent?.toString() === req.user.id;

    if (!isAdmin && !isOwnerAgent) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await appointment.deleteOne();

    res.status(200).json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('Delete Appointment Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
