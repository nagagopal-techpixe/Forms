
import DemoRequest from "../models/DemoRequest.js";

// POST /api/demo
export const createDemoRequest = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // 🔍 1. Duplicate check (either email or phone exists)
    const existing = await DemoRequest.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A demo request with this email or phone number already exists"
      });
    }

    // ✅ 2. Create new demo request
    const demoRequest = new DemoRequest(req.body);
    await demoRequest.save();

    res.status(201).json({
      success: true,
      message: "Demo request submitted successfully",
      data: demoRequest
    });

  } catch (error) {
    console.error(error);

    // ❌ 3. Handle validation errors from Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
     
    }

    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};


// GET /api/demo (optional)
export const getDemoRequests = async (req, res) => {
  try {
    const requests = await DemoRequest.find().sort({ createdAt: -1 });
    const filteredLeads = requests.map(request => ({
      fullName:request.fullName,
      businessName:request.businessName,
      email:request.email,
      phoneNumber:request.phoneNumber,
      businessType:request.businessType,
      preferredDemoType:request.preferredDemoType,
      preferredTimeSlot:request.preferredTimeSlot,
      featuresInterested:request.featuresInterested,
      questions:request.questions,

    }));
    res.json({ success: true, data: filteredLeads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
