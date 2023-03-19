import express from "express";

import { auth, admin } from "middleware";
import { UserModel } from "models";

import { userRoles, languages } from "@sanakirja/shared";
import type { User, UserPreferences, UserRoles } from "@sanakirja/shared";
import type { AuthRequest } from "types";

const router = express.Router();

router.post("/api/v1/users/signup", async (req: AuthRequest, res) => {
  const newUser = req.body as User;
  const user = new UserModel({
    ...newUser,
    role: "user",
    preferences: {
      mode: "finnish",
    },
  });

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.post("/api/v1/users/login", async (req: AuthRequest, res) => {
  const { name, password } = req.body as User;

  try {
    const user = await UserModel.findByCredentials(name, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/api/v1/users/logout", auth, async (req: AuthRequest, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.post("/api/v1/users/logout_all", auth, async (req: AuthRequest, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.get("/api/v1/users", [auth, admin], async (req: AuthRequest, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.get("/api/v1/users/me", auth, async (req: AuthRequest, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.get("/api/v1/users/token", auth, async (req: AuthRequest, res) => {
  try {
    const token = req.token;

    if (!token) {
      res.status(404).send("Unable to find token");
    }

    res.status(200).send(token);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.get("/api/v1/users/:userId", [auth, admin], async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.put("/api/v1/users/:userId", [auth, admin], async (req: AuthRequest, res) => {
  const updates = req.body as User;
  const updatesKeys = Object.keys(updates);

  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    updatesKeys.forEach((update) => (user[update] = updates[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.put("/api/v1/users/:userId/role", auth, async (req: AuthRequest, res) => {
  const updates = req.body as { role: UserRoles };

  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    if (!userRoles.includes(updates.role)) {
      return res.status(400).send("Incorrect role");
    }

    user.role = updates.role;

    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.put("/api/v1/users/:userId/preferences", auth, async (req: AuthRequest, res) => {
  const updates = req.body as UserPreferences;
  const updatesKeys = Object.keys(updates);

  try {
    const user = await UserModel.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    if (!languages.includes(updates.mode)) {
      return res.status(400).send("Incorrect preferences");
    }

    updatesKeys.forEach((update) => (user.preferences[update] = updates[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.delete("/api/v1/users/", [auth, admin], async (req: AuthRequest, res) => {
  try {
    await UserModel.deleteMany({});

    res.status(200).send();
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

router.delete("/api/v1/users/:userId", [auth, admin], async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).send("Unable to find user");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e.message}`);
  }
});

export { router };
