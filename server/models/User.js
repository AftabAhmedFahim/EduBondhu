import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  institution: { type: String, required: true, trim: true},
  address: { type: String, required: true , trim: true},
  contact: { 
    type: String, 
    required: true ,
    validate: {
      validator: (v) => /^01\d{9}$/.test(v),  // starts with 01 and 11 digits
      message: "Contact number must start with 01 and be 11 digits long"
    }
  },
  role: { type: String, enum: ["Student", "Tutor"], required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v),
      message: "Email must end with @gmail.com"
    }
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
    validate: {
      validator: (v) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
      message: "Password must be at least 8 characters, include a digit and a capital letter"
    } 
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Hashing Password for safety
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
