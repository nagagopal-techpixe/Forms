import Lead from "../models/LeadModel.js";

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const { email, phoneNumber, businessType, websiteIntegration } = req.body;

    // Check for duplicates
    const existingLead = await Lead.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "This email or phone number is already registered.",
      });
    }

    // Convert fields to match schema
    const formattedData = {
      ...req.body,
      businessType: [businessType],   // Convert single value → array
      websiteIntegration: websiteIntegration === "Yes" ? true : false
    };

    const lead = new Lead(formattedData);
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      data: lead,
    });

  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    const filteredLeads = leads.map(lead => ({
  fullName: lead.fullName,
  businessName:lead.businessName,
  email: lead.email,
  phoneNumber:lead.phoneNumber,
  country:lead.country,
  city:lead.city,
  businessType:lead.businessType,
Branches:lead.numberOfBranches,
websiteIntegration:lead.websiteIntegration,
  message:lead.message,

}));

    res.json({ success: true, data: filteredLeads });
    // console.log( filteredLeads )

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
