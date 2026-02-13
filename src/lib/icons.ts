const STYLE_TOKENS = [
  "fa-solid",
  "fa-regular",
  "fa-brands",
  "fa-duotone",
  "fa-light",
  "fa-thin",
];

export const normalizeFaIcon = (icon = "") => {
  if (!icon) return "fa-solid fa-circle";

  const value = icon.replace("fa-brand", "fa-brands").trim();
  let tokens = value.split(/\s+/).filter(Boolean);

  tokens = tokens.map((token) => {
    if (!token.startsWith("fa-")) return token;
    if (/[A-Z]/.test(token)) {
      return token.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    return token;
  });

  if (!tokens.some((token) => STYLE_TOKENS.includes(token))) {
    tokens.unshift("fa-solid");
  }

  if (!tokens.some((token) => token.startsWith("fa-") && token.length > 4)) {
    tokens.push("fa-circle");
  }

  return tokens.join(" ");
};
