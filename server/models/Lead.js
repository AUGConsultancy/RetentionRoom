import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    channelLink: {
      type: String,
      required: [true, 'YouTube channel link is required'],
      trim: true,
    },
    monthlyViews: {
      type: String,
      required: [true, 'Average monthly views range is required'],
      enum: [
        'Under 10k / month',
        '10k – 100k / month',
        '100k – 1M / month',
        '1M+ / month',
      ],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lead', leadSchema)
