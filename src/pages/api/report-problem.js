// pages/api/report-problem.js
// Import necessary modules
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';
import connectToDatabase from '../../../lib/mongodb';
import Report from '../../../models/Report';

// Disable default body parsing, as formidable handles it
export const config = {
  api: {
    bodyParser: false,
  },
};

// Main API handler function
export default async (req, res) => {
  // Connect to the MongoDB database
  await connectToDatabase();

// Configure the form parser
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
     // Handle form parsing errors
    if (err) {
      console.error('Error parsing the form data:', err);
      return res.status(500).json({ message: 'Error parsing the form data' });
    }

    // Extract fields, ensuring they are strings
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
    const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
    const issue = Array.isArray(fields.issue) ? fields.issue[0] : fields.issue;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

    // Handle the photo file if it exists
    const photo = files.photo ? files.photo[0].filepath : null;

    try {
      const report = new Report({
        name,
        phone,
        location,
        issue,
        description,
        photo,
        createdAt: new Date(),
      });
      // Save the report to the database
      await report.save();
       // Send a success response
      res.status(200).json({ message: 'Problem reported successfully!' });
    } catch (dbError) {
        // Handle database errors
      console.error('Database error:', dbError);
      res.status(500).json({ message: 'Error saving data to the database' });
    }
  });
};
