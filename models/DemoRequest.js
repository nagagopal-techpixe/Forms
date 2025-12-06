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
    required: [true, "Phone Number is required"],
    validate: {
      validator: function(v) {
        return /^\+?\d{10,15}$/.test(v); // Allows optional +, 10-15 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: { 
    type: String,
    unique: true, 
    trim: true,
    lowercase: true,
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
    maxlength: [100, "Business Name cannot exceed 100 characters"]
  },
businessType: {
  type: [String],
  required: true,
    },
  preferredDemoType: { 
    type: String, 
    enum: {
      values: ["Recorded Video Demo","Live Zoom Demo"],
      message: "{VALUE} is not a valid demo type"
    }
  },
  featuresInterested: [{
    type: String,
    trim: true
  }],
  questions: { 
    type: String,
    trim: true,
    maxlength: [500, "Questions cannot exceed 500 characters"]
  },
  createdAt: { type: Date, default: Date.now },
});

const DemoRequest = mongoose.model("DemoRequest", demoRequestSchema);
export default DemoRequest;