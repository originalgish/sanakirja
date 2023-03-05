export const languages = ["finnish", "english"] as const;

export type Language = (typeof languages)[number];
