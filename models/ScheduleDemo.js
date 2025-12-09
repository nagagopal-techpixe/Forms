import mongoose from "mongoose";

const scheduleDemoSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Full Name is required"],
    trim: true,
    minlength: [3, "Full Name must be at least 3 characters"],
    maxlength: [50, "Full Name cannot exceed 50 characters"]
  },

  phoneNumber: { 
    type: String, 
    unique: true, 
    required: [true, "Phone Number is required"],
    validate: {
      validator: function(v) {
        return /^\+?\d{10,15}$/.test(v); // 10–15 digits with optional +
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },

  email: { 
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
    unique: true, 
    validate: {
      validator: function(v) {
        // allow empty OR valid email
        return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },

  businessName: { 
    type: String,
    trim: true,
    maxlength: [100, "Business Name cannot exceed 100 characters"],
    required: [true, "Phone Number is required"],

  },

  countryTimezone: {
    type: String,
    required: [true, "Timezone is required"],
    trim: true,
  },

  preferredDate: {
    type: String,
    required: [true, "Preferred date is required"],
    validate: {
      validator: function(v) {
        // Must be YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid date format (Use YYYY-MM-DD)`
    }
  },

  preferredTimeSlot: { 
    type: String, 
    enum: {
      values: [
          "10:00 AM",
          "11:00 AM",
          "1:00 PM",
          "2:00 PM",
          "4:00 PM",
          "5:00 PM"
        ],
      message: "{VALUE} is not a valid time slot"
    },
    required: [true, "Preferred time slot is required"]
  },

  teamMembers: { 
    type: String, 
    enum: {
      values: ["Just Me", "2", "3–5", "5+"],
      message: "{VALUE} is not a valid team size"
    },
    required: [true, "Team members selection is required"]
  },

  createdAt: { type: Date, default: Date.now },
});

const ScheduleDemo = mongoose.model("ScheduleDemo", scheduleDemoSchema);
export default ScheduleDemo;
