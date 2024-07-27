// models/Report.js
import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  issue: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);

export default Report;
