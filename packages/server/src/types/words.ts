import type { Language } from "@sanakirja/shared";

export type Mode = Language;

export type Word = Record<Language, string>;

export type Words = {
  mode: Mode;
  words: Word[];
};
