import { model, Schema } from "mongoose";

import type { Words } from "types";

const wordsSchema = new Schema<Words>({
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
