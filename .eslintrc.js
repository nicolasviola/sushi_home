module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "plugin:tribou/recommended",
    "plugins": ["tribou"],
    "settings": {
      "flowtype": {
        "onlyFilesWithFlowAnnotation": true
      },
      "import/resolver": "webpack"
    },
};
