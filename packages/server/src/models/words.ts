import { model, Schema } from "mongoose";

import type { Word } from "types";

const wordsSchema = new Schema<Word>({
  finnish: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
});

const WordsModel = model("Words", wordsSchema);

export { WordsModel };
