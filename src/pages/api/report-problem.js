// pages/api/report-problem.js
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';
import connectToDatabase from '../../../lib/mongodb';
import Report from '../../../models/Report';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await connectToDatabase();

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
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

      await report.save();
      res.status(200).json({ message: 'Problem reported successfully!' });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ message: 'Error saving data to the database' });
    }
  });
};
