import express from "express";

import { auth } from "middleware";
import { SettingsModel } from "models";

import type { Language } from "@sanakirja/shared";

const router = express.Router();

router.get("/api/v1/settings", auth, async (req, res) => {
  try {
    const settings = await SettingsModel.findOne({});
    res.status(200).send(settings);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/v1/settings/create", auth, async (req, res) => {
  try {
    const settings = new SettingsModel({
      mode: "finnish",
    });

    await settings.save();
    res.status(201).send(settings);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/api/v1/settings/set_mode", auth, async (req, res) => {
  try {
    const { mode } = req.body as { mode: Language };

    if (!(mode === "english" || mode === "finnish")) {
      return res.status(400).send("Incorrect mode");
    }

    const settings = await SettingsModel.findOne({});

    settings.mode = mode;

    await settings.save();
    res.status(200).send(settings);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/settings", auth, async (req, res) => {
  try {
    await SettingsModel.deleteMany({});

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

export { router };
