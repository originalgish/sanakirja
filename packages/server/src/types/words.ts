export type Languages = "finnish" | "english";

export type Mode = Languages;

export type Word = Record<Languages, string>;

export type Words = {
  mode: Mode;
  words: Word[];
};
