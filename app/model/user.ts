'use strict';

module.exports = app => {
  const { mongoose } = app;
  const UserSchema = new mongoose.Schema({
    phone: { type: String },
    nickName: { type: String },
    password: { type: String },
    token: { type: String },
    role: { type: String, enum: [ 'USER', 'ADMIN' ], default: 'USER' },
  });

  return mongoose.model('User', UserSchema);
};
