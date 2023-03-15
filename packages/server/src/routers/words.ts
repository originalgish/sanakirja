import express from "express";

import { api } from "api";
import { auth, admin } from "middleware";
import { WordsModel } from "models";

const router = express.Router();

router.get("/api/v1/words", auth, async (req, res) => {
  try {
    const words = await WordsModel.find({});
    res.status(200).send(words);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/words/get_random", auth, async (req, res) => {
  try {
    const words = await WordsModel.find({});

    const randomId = Math.floor(Math.random() * words.length);
    res.status(200).send(words[randomId]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/words/load", [auth, admin], async (req, res) => {
  try {
    await WordsModel.deleteMany({});

    const notionPage = await api.getAllWords();

    const mappedWords = notionPage
      .map((data) => ({
        finnish: data.table_row.cells[0][0]?.plain_text,
        english: data.table_row.cells[1][0]?.plain_text,
      }))
      .filter((word) => word.english && word.finnish);

    const words = await WordsModel.create(mappedWords);

    res.status(200).send(words);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/words", [auth, admin], async (req, res) => {
  try {
    await WordsModel.deleteMany({});

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

export { router };
