import mongoose from "mongoose";

const demoRequestSchema = new mongoose.Schema({
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
    required: [true, "Phone Number (WhatsApp) is required"],
    match: [/^\+?[0-9]{8,15}$/, "Invalid phone number format"]
  },
  email: { 
    type: String,
    unique: true, 
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: {
      validator: function(v) {
        return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  businessName: { 
    type: String,
    trim: true,
    required: true,
    maxlength: [100, "Business Name cannot exceed 100 characters"]
  },
businessType: {
  type: String,
  required: true,
    },
  preferredDemoType: { 
    type: String,
  required: true,
    enum: {
      values: ["Recorded Video Demo","Live Zoom Demo"],
      message: "{VALUE} is not a valid demo type"
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
    default: null, 
    // required: [true, "Preferred time slot is required"]
  },
  featuresInterested: [{
    type: String,
    trim: true,
     default: null, 
  }],
  questions: { 
    type: String,
    trim: true,
    maxlength: [500, "Questions cannot exceed 500 characters"],
     default: null, 

  },
  createdAt: { type: Date, default: Date.now },
});

const DemoRequest = mongoose.model("DemoRequest", demoRequestSchema);
export default DemoRequest;