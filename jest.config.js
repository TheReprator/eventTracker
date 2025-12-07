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
    "\\.(png|jpg|jpeg|gif)$": "<rootDir>/jest/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/jest/mocks/styleMock.js",
    "^react-native-restart$": "<rootDir>/jest/mocks/react-native-restart.js",
    "^react-native-localize$": "<rootDir>/jest/mocks/react-native-localize.js",
  },
  
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
