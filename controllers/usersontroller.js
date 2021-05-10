const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({
      username,
    });

    if (userExists) {
      return next(new ErrorResponse('Duplicate Username Entered', 400));
    }

    const user = await User.create({
      username,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(
        new ErrorResponse('Please Provide an username and password', 400)
      );
    }
    const fetchedUser = await User.findOne({ username }).select('+password');

    if (!fetchedUser) {
      return next(new ErrorResponse('Authentication failed', 401));
    }

    const passwordisMatched = await fetchedUser.matchPassword(password);

    if (!passwordisMatched) {
      return next(new ErrorResponse('Authentication failed', 401));
    }

    const token = jwt.sign(
      {
        username: fetchedUser.username,
        userId: fetchedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
