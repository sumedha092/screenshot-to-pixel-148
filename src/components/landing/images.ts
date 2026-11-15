const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

export const IMAGES = {
  hero: u("1543466835-00a7907e9de1", 900),
  labelProof: u("1477884213360-7e9d7dcc1e48", 700),
  passport: u("1518717758536-85ae29035b6d", 600),
  shake: u("1548199973-03cce0bbc87b", 600),
  avatarA: u("1561037404-61cd46aa615b", 200),
  avatarB: u("1587300003388-59208cc962cb", 200),
  avatarC: u("1576201836106-db1758fd1c97", 200),
};

/** Where every "Open the app" button points. */
export const APP_URL = "#demo";
