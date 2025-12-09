import ScheduleDemo from "../models/ScheduleDemo.js";

// POST /api/schedule
export const createSchedule = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // 🔍 1. Duplicate check (email or phone)
    const existing = await ScheduleDemo.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A demo with this email or phone number already exists"
      });
    }

    // ✅ 2. Create new schedule
    const schedule = new ScheduleDemo(req.body);
    await schedule.save();

    res.status(201).json({
      success: true,
      message: "Live demo scheduled successfully",
      data: schedule,
    });

  } catch (error) {
    console.error(error);

    // ❌ 3. Validation errors handling
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET /api/schedule (optional admin)
export const getSchedules = async (req, res) => {
  try {
    const schedules = await ScheduleDemo.find().sort({ createdAt: -1 });
     const filteredschedules = schedules.map(schedule => ({
      fullName:schedule.fullName,
      businessName:schedule.businessName,
      email:schedule.email,
      phoneNumber:schedule.phoneNumber,
      countryTimezone:schedule.countryTimezone,
      preferredDate:schedule.preferredDate,

      preferredTimeSlot:schedule.preferredTimeSlot,
      teamMembers:schedule.teamMembers,
    }));
    res.json({ success: true, data: filteredschedules });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
