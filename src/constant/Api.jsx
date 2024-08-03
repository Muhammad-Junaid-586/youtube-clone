const API_KEYS = [
  "AIzaSyDRLHlpxgwo9X5SkTYwu52xH4EtqgQiMzs",
  "AIzaSyAExQ64ZH3zHjEq38efwRSbPaalYK-f7FY",
  "AIzaSyCGmV_vD6PbZumnPHH9suTukhoqPxigfHM",
];

let currentKeyIndex = 0;
let lastKeyChangeTime = Date.now();
const ROTATION_INTERVAL = 14 * 60 * 60 * 1000; // 30 minutes in milliseconds

export const getApiKey = () => {
  const now = Date.now();

  // Rotate keys if interval has passed
  if (now - lastKeyChangeTime > ROTATION_INTERVAL) {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    lastKeyChangeTime = now;
  }

  return API_KEYS[currentKeyIndex];
};
