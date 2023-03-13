import express from "express";

import { auth } from "middleware";
import { UserModel } from "models";

import type { User, UserPreferences } from "@sanakirja/shared";
import type { AuthRequest } from "types";

const router = express.Router();

router.post("/api/v1/users/signup", async (req: AuthRequest, res) => {
  const newUser = req.body as User;
  const user = new UserModel({
    ...newUser,
    preferences: {
      mode: "finnish",
    },
  });

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/users/login", async (req: AuthRequest, res) => {
  const { name, password } = req.body as User;

  try {
    const user = await UserModel.findByCredentials(name, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/users/logout", auth, async (req: AuthRequest, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/users/logout_all", auth, async (req: AuthRequest, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/users", auth, async (req: AuthRequest, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/users/me", auth, async (req: AuthRequest, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/users/token", auth, async (req: AuthRequest, res) => {
  try {
    const token = req.token;

    if (!token) {
      res.status(404).send();
    }

    res.status(200).send(token);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/users/:userId", auth, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/api/v1/users/:userId", auth, async (req: AuthRequest, res) => {
  const updates = req.body as User;
  const updatesKeys = Object.keys(updates);

  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send();
    }

    updatesKeys.forEach((update) => (user[update] = updates[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/api/v1/users/:userId/preferences", auth, async (req: AuthRequest, res) => {
  const updates = req.body as UserPreferences;
  const updatesKeys = Object.keys(updates);

  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send();
    }

    if (!(updates.mode === "english" || updates.mode === "finnish")) {
      return res.status(400).send("Incorrect mode");
    }

    updatesKeys.forEach((update) => (user.preferences[update] = updates[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/users/", auth, async (req: AuthRequest, res) => {
  try {
    await UserModel.deleteMany({});

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/v1/users/:userId", auth, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

export { router };
