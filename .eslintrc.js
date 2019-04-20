module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "rules": {
        "react/no-array-index-key": "off",
        "react/jsx-filename-extension": "off",
        "no-shadow": "off",
        "react/prop-types": "off", // 😬
        "no-unused-vars": "warn",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/jsx-one-expression-per-line": "off"
    }
};