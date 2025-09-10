const mongoose = require('mongoose');


const ResumeSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, default: 'Untitled Resume' },
data: { type: Object, default: {} },
template: { type: String, default: 'basic' },
}, { timestamps: true });


module.exports = mongoose.model('Resume', ResumeSchema);