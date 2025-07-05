import Appointment from '../models/Appointment.js';
import Property from '../models/Property.js';

/**
 * @desc    Book an appointment
 * @route   POST /api/appointments
 * @access  Private (Agent/Admin)
 */
export const createAppointment = async (req, res) => {
  const { property, date, time, message } = req.body;

  if (!property || !date || !time || !message) {
    return res.status(400).json({ success: false, message: 'All fields (property, date, time, message) are required.' });
  }

  try {
    const propExists = await Property.findById(property);
    if (!propExists) {
      return res.status(404).json({ success: false, message: 'Property not found.' });
    }

    const appointment = await Appointment.create({
      property,
      user: req.user?.id,
      date,
      time,
      message
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Create Appointment Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all appointments
 * @route   GET /api/appointments
 * @access  Private (Admin)
 */
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('property', 'title')
      .populate('user', 'name email');

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get Appointments Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get single appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private (Admin)
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('property', 'title')
      .populate('user', 'name email');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Get Appointment By ID Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Delete an appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private (Admin)
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await appointment.deleteOne();
    res.status(200).json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('Delete Appointment Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
