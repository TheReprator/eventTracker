module.exports = {
  preset: "react-native",
  testEnvironment: "node",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest"
    ]
  },

  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-native-restart" +
      "|react-native-localize" +
      "|@react-native-async-storage" +
      "|@react-navigation" +
      "|immer" +
      ")/)"
  ],

  moduleNameMapper: {
    // "\\.(png|jpg|jpeg|gif)$": "<rootDir>/jest/mocks/fileMock.js",
    // "\\.(css|less)$": "<rootDir>/jest/mocks/styleMock.js",
    "^react-native-restart$": "<rootDir>/jest/mocks/react-native-restart.js",
    "^react-native-localize$": "<rootDir>/jest/mocks/react-native-localize.js",
    "^react-native$": "<rootDir>/src/appConfiguration/store/slices/__test__/__mock__/I18nManager.mock.ts",
    "^@/appConfiguration/localization/i18n$": "<rootDir>/src/appConfiguration/localization/__test__/__mock__/i18n.mock.ts",
    "^react-i18next$": "<rootDir>/src/appConfiguration/localization/__test__/__mock__/react-i18next.mock.ts",
  },
  
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
