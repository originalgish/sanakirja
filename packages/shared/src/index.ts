export const languages = ["finnish", "english"] as const;

export type Language = (typeof languages)[number];

export type UserPreferences = {
  mode: Language;
};

export const userRoles = ["admin", "user"] as const;

export type UserRoles = (typeof userRoles)[number];

export type User = {
  _id: string;
  name: string;
  role: UserRoles;
  password: string;
  preferences: UserPreferences;
  tokens: {
    token: string;
  }[];
};
