import { model, Schema } from "mongoose";

import type { Words } from "types";

const wordsSchema = new Schema<Words>({
  mode: {
    type: String,
    required: true,
  },
  words: [
    {
      finnish: {
        type: String,
        required: true,
      },
      english: {
        type: String,
        required: true,
      },
    },
  ],
});

const WordsModel = model("Words", wordsSchema);

export { WordsModel };
