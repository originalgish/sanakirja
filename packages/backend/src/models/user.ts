import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";

import { config } from "config";

import type { CustomUserDocument, CustomUserModel } from "types";

const userSchema = new Schema<CustomUserDocument>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    preferences: {
      mode: {
        type: String,
        required: true,
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, config.jwt_secret);

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.statics.findByCredentials = async (name, password) => {
  const user = await UserModel.findOne({ name });

  if (!user) {
    throw new Error("Unable to find user");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const UserModel = model<CustomUserDocument, CustomUserModel>("User", userSchema);

export { UserModel };
