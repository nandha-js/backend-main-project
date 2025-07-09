import Property from "../models/Property.js";
import geocoder from "../utils/geocoder.js";

// @desc    Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "agent",
      "name email phone"
    );
    res
      .status(200)
      .json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    console.error("Get Properties Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "agent",
      "name email phone"
    );
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error("Get Property By ID Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create property
export const createProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    type,
    size,
    rooms,
    bedrooms,
    bathrooms,
    images,
  } = req.body;

  if (!title || !price || !address) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, price, and address",
    });
  }

  try {
    const loc = await geocoder.geocode(address);
    if (!loc?.length || !loc[0].formattedAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address for geocoding" });
    }

    const property = await Property.create({
      agent: req.user.id,
      title,
      description,
      price,
      address,
      location: {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
      },
      type,
      size,
      rooms,
      bedrooms,
      bathrooms,
      images,
    });

    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error("Create Property Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Only owner agent can update
    if (
      property.agent.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

    const {
      title,
      description,
      price,
      address,
      type,
      size,
      rooms,
      bedrooms,
      bathrooms,
      images,
    } = req.body;

    if (address && address !== property.address) {
      const loc = await geocoder.geocode(address);
      if (!loc?.length || !loc[0].formattedAddress) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid address for geocoding" });
      }
      property.address = address;
      property.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
      };
    }

    property.title = title ?? property.title;
    property.description = description ?? property.description;
    property.price = price ?? property.price;
    property.type = type ?? property.type;
    property.size = size ?? property.size;
    property.rooms = rooms ?? property.rooms;
    property.bedrooms = bedrooms ?? property.bedrooms;
    property.bathrooms = bathrooms ?? property.bathrooms; 
    property.images = images ?? property.images;

    const updatedProperty = await property.save();
    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error("Update Property Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Delete property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    if (
      property.agent.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this property",
        });
    }

    await property.deleteOne();
    res.status(200).json({ success: true, message: "Property removed" });
  } catch (error) {
    console.error("Delete Property Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
