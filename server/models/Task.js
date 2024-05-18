const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

TaskSchema.pre('save', function (next) {
  if (this.isNew) {
    this.created_at = Date.now();
  } else {
    this.updated_at = Date.now();
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);