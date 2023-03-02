import express from "express";

import { api } from "api";
import { WordsModel } from "models";

import type { Mode } from "types";

const router = express.Router();

router.get("/api/v1/words", async (req, res) => {
  try {
    const words = await WordsModel.findOne({});
    res.status(200).send(words);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/words/get_random", async (req, res) => {
  try {
    const words = await WordsModel.findOne({});
    const wordsArray = words.words;

    const randomId = Math.floor(Math.random() * wordsArray.length);
    res.status(200).send(wordsArray[randomId]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/words/get_mode", async (req, res) => {
  try {
    const words = await WordsModel.findOne({});

    res.status(200).send({ mode: words.mode });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/words/create", async (req, res) => {
  try {
    const words = new WordsModel({
      mode: "finnish",
      words: [],
    });

    await words.save();
    res.status(201).send(words);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/api/v1/words/load", async (req, res) => {
  try {
    const words = await WordsModel.findOne({});
    const response = await api.getAllWords();

    const mappedWords = response
      .map((data) => ({
        finnish: data.table_row.cells[0][0]?.plain_text,
        english: data.table_row.cells[1][0]?.plain_text,
      }))
      .filter((word) => word.english && word.finnish);

    words.words = mappedWords;

    await words.save();
    res.status(200).send(words);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/api/v1/words/set_mode", async (req, res) => {
  try {
    const { mode } = req.body as { mode: Mode };

    if (!(mode === "english" || mode === "finnish")) {
      return res.status(400).send("Incorrect mode");
    }

    const words = await WordsModel.findOne({});

    words.mode = mode;

    await words.save();
    res.status(200).send(words);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/words", async (req, res) => {
  try {
    await WordsModel.deleteMany({});

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

export { router };
