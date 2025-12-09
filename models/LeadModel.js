import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
   fullName: { 
    type: String, 
    required: [true, "Full Name is required"],
    trim: true,
    minlength: [3, "Full Name must be at least 3 characters"],
    maxlength: [50, "Full Name cannot exceed 50 characters"]
  },


  businessName: { 
    type: String,
    required: [true, "Business / Salon Name is required"]
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
    lowercase: true,
    required: [true, "Email Address is required"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },

  country: { 
    type: String,
    required: [true, "Country is required"]
  },

  city: { 
    type: String,
    required: [true, "City is required"]
  },

 businessType: {
  type: [String],
  required: [true, "Type of Business is required"]
},

  numberOfBranches: { 
    type: String, 
    enum: {
      values: ["1", "2–3", "4–5", "5+"],
      message: "{VALUE} is not a valid selection for number of branches"
    },
    required: [true, "Number of Branches is required"]
  },

  websiteIntegration: { 
    type: Boolean, 
    required: [true, "Website integration selection is required"],
    default: false 
  },

  message: { 
    type: String,
    maxlength: [500, "Message cannot exceed 500 characters"],
    default: null, 

  },

  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
