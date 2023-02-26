import express from "express";

import { api } from "api";
import { WordsModel } from "models";

const router = express.Router();

router.get("/api/v1/words", async (req, res) => {
  try {
    const words = await WordsModel.find({});
    res.status(200).send(words);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/v1/words/get_random", async (req, res) => {
  try {
    const [words] = await WordsModel.find({});
    const wordsArray = words.words;

    const randomId = Math.floor(Math.random() * wordsArray.length);
    res.status(200).send(wordsArray[randomId]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/v1/words/load", async (req, res) => {
  try {
    await WordsModel.deleteMany({});
    const response = await api.getAllWords();

    const mappedWords = response
      .map((data) => ({
        finnish: data.table_row.cells[0][0]?.plain_text,
        english: data.table_row.cells[1][0]?.plain_text,
      }))
      .filter((word) => word.english && word.finnish);

    const words = new WordsModel({
      words: mappedWords,
    });

    await words.save();
    res.status(201).send(words);
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
