const asyncCatchErrors = require("../middleware/asyncCatchErrors");
const UserModel = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// creating user
exports.userRegister = asyncCatchErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "trustCartAvatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//login user
exports.userLogin = asyncCatchErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking email & password both should be there if none is there then we will throw error
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  sendToken(user, 200, res);
});

//user logout
exports.userLogout = asyncCatchErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
});

// user forgot password
exports.forgotPassword = asyncCatchErrors(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found, Invalid email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset URL is : \n\n ${resetPasswordUrl} \n\n if you have not requsted this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "TrustCart Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} \n\n ${message}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// user reset password
exports.resetPassword = asyncCatchErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});

//get profile details
exports.getProfile = asyncCatchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//change/update password
exports.changePassword = asyncCatchErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // checking all should be there
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(
      new ErrorHandler("Please enter oldPassword and newPassword", 400)
    );
  }

  // checking newPassword and confirmPassword
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirmPassword does not matched", 400)
    );
  }

  const user = await UserModel.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("oldPassword does not matched", 400));
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});

// update user details
exports.updateUser = asyncCatchErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await UserModel.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "trustCartAvatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    upsert: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users (Admin)
exports.getAllUsers = asyncCatchErrors(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get single user (Admin)
exports.getSingleUser = asyncCatchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found, Invalid ID", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// change user role
exports.updateUserRole = asyncCatchErrors(async (req, res, next) => {
  const { name, email, role } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorHandler("User not found, Invalid ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "user updated succesfully",
    user,
  });
});

// delete user (Admin)
exports.deleteUser = asyncCatchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found, Invalid ID", 404));
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "user deleted succesfully",
    user,
  });
});
