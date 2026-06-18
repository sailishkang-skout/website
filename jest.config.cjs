const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!(date-fns)/)", "^.+\\.module\\.(css|sass|scss)$"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
});
