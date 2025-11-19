const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");
const withTransaction = require("../helpers/withTransaction");
const serviceResponse = require("../helpers/serviceResponse");
const deleteWrapper = require("../helpers/deleteWrapper");
const setJwtCookie = require("../helpers/setJwtCookie");

class UserServices {
  async getAllUsers(req) {
    //reading all users from database except current user that is maybe admin
    const findOp = await User.find({ _id: { $ne: req.user.id } });
    return serviceResponse(200, findOp);
  }

  async seeOneUser(req, res) {
    // reading one user from database
    const findOp = await User.findById(req.params.userId);
    return serviceResponse(200, findOp);
  }

  async registerUser(req, res) {
    // create user , same as register , after user created , the cart will automaticly create
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return serviceResponse(400, {});
    }
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const transactionResult = await withTransaction(async (session) => {
      const saveOp = await user.save({ session });
      const newCart = new Cart({
        userId: user.id,
      });
      await newCart.save({ session });
      return serviceResponse(200, saveOp);
    });
    return transactionResult;
  }

  async updateUser(req, res) {
    //if you changed the email field , it checks if its exists or not , then it updates the user
    const { data: user } = await this.seeOneUser(req, res);
    let repeatedEmail = await User.findOne({ email: req.body.email });
    if (repeatedEmail && user.email !== req.body.email) {
      return serviceResponse(400, {});
    }

    user.name = req.body.name;
    user.email = req.body.email;
    const updateOp = await user.save();
    return serviceResponse(200, {});
  }

  async deleteUser(req, res) {
    //delete user , admin cant delete himself
    if (req.params.userId !== req.user.id) {
      const transactionResult = await withTransaction(async (session) => {
        const deleteOp = await User.findOneAndDelete(
          { _id: req.params.userId },
          { session }
        );
        if (deleteOp) {
          const deleteCartOp = await Cart.deleteOne(
            {
              userId: req.params.userId,
            },
            { session }
          );
          deleteOp.avatar
            ? deleteFile(
                deleteOp.avatar.substring(1),
                deleteOp.avatar.substring(1)
              )
            : null;
          return serviceResponse(200, {});
        }
        return serviceResponse(404, {});
      });
      return transactionResult;
    }
    return serviceResponse(400, {});
  }

  async addAvatar(req, res) {
    //اضافه کردن آواتار
    const newAvatar = {
      urls: req.file.urls,
    };
    const updateOp = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { avatar: newAvatar } }
    );
    if (updateOp) {
      if (updateOp.avatar && updateOp.avatar.urls) {
        deleteWrapper(updateOp.avatar.urls._doc);
      }
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteAvatar(req, res) {
    //حذف کردن آواتار
    const updateOp = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { avatar: null } }
    );
    if (updateOp) {
      if (updateOp.avatar && updateOp.avatar.urls) {
        deleteWrapper(updateOp.avatar.urls._doc);
      }
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  //update profile
  async updateProfile(req, res) {
    let data = {
      name: req.body.name,
    };
    const updateOp = await User.updateOne({ _id: req.user.id }, { $set: data });
    if (updateOp.matchedCount > 0) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async verifyUser(req, res) {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { verified: true } },
      { new: true }
    );
    if (user) {
      setJwtCookie(res, user);
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async createResetPasswordToken(req, res) {
    const resetToken = crypto.randomBytes(32).toString("hex");

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    const updateOp = await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          passwordResetToken: passwordResetToken,
          passwordResetTokenExpires: passwordResetTokenExpires,
        },
      }
    );
    if (updateOp.modifiedCount > 0) {
      return serviceResponse(200, resetToken);
    }
    return serviceResponse(404, {});
  }

  async passwordRestoration(req, res) {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const updateOp = await User.updateOne(
      {
        passwordResetToken: token,
        passwordResetTokenExpires: { $gt: Date.now() },
      },
      {
        $set: {
          password: bcrypt.hashSync(req.body.password, 8),
          passwordResetToken: null,
          passwordResetTokenExpires: null,
        },
      }
    );
    if (updateOp.modifiedCount > 0) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new UserServices();
