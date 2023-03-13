export const languages = ["finnish", "english"] as const;

export type Language = (typeof languages)[number];

export type UserPreferences = {
  mode: Language;
};

export type User = {
  name: string;
  password: string;
  preferences: UserPreferences;
  tokens: {
    token: string;
  }[];
};
