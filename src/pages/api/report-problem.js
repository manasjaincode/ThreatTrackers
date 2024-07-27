import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../../lib/mongodb';
import Report from '../../../models/Report';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    await db;

    const form = new IncomingForm({
        uploadDir: './public/uploads',
        keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing the form data' });
        }

        const { name, phone, location, issue, description } = fields;
        const photo = files.photo ? files.photo.filepath : null;

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

            console.log(report)

            await report.save();

            res.status(200).json({ message: 'Problem reported successfully!' });
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ message: 'Error saving data to the database' });
        }
    });
};
