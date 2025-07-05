// controllers/appointmentController.js
import Appointment from '../models/Appointment.js';
import Property from '../models/Property.js';

/**
 * @desc    Book a property appointment
 * @route   POST /api/appointments
 * @access  Private
 */
export const bookAppointment = async (req, res) => {
  const { propertyId, date, time, message } = req.body;

  if (!propertyId || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
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
    console.error('Book Appointment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all appointments (admin only)
 * @route   GET /api/appointments
 * @access  Private/Admin
 */
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('user', 'name email')
      .populate('property', 'title address');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single appointment
 * @route   GET /api/appointments/:id
 * @access  Private
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('user', 'name email')
      .populate('property', 'title address');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    await appointment.deleteOne();
    res.status(200).json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
