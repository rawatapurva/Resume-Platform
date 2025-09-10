const Resume = require('../models/Resume');


exports.createResume = async (req, res) => {
const payload = req.body; // expected { title, data, template }
const resume = await Resume.create({ user: req.user._id, ...payload });
res.status(201).json(resume);
};


exports.getResumes = async (req, res) => {
const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
res.json(resumes);
};


exports.updateResume = async (req, res) => {
const { id } = req.params;
const resume = await Resume.findOne({ _id: id, user: req.user._id });
if (!resume) return res.status(404).json({ message: 'Not found' });
resume.title = req.body.title || resume.title;
resume.data = req.body.data || resume.data;
resume.template = req.body.template || resume.template;
await resume.save();
res.json(resume);
};


exports.deleteResume = async (req, res) => {
const { id } = req.params;
const resume = await Resume.findOneAndDelete({ _id: id, user: req.user._id });
if (!resume) return res.status(404).json({ message: 'Not found' });
res.json({ message: 'Deleted' });
};


exports.getResumeById = async (req, res) => {
const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
if (!resume) return res.status(404).json({ message: 'Not found' });
res.json(resume);
};