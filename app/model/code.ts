'use strict';

module.exports = app => {
  const { mongoose } = app;
  const CodeSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    code: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

  return mongoose.model('Code', CodeSchema);
};
