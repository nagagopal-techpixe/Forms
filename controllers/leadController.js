import Lead from "../models/LeadModel.js";

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const { email,phoneNumber } = req.body;

    // 👉 Check if email already exists
    if (email) {
      const existingLead = await Lead.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });

      if (existingLead) {
        return res.status(400).json({
          success: false,
          message: "This email is already or phoneNumber registered.",
        });
      }
    }

    const lead = new Lead(req.body);
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      data: lead,
    });

  } catch (error) {
    console.error(error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({ success: true, data: leads });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
