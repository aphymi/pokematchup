/* eslint-disable */

const path = require("node:path");
const createAliasSetting = require("@vue/eslint-config-airbnb/createAliasSetting");


const isProductionBuild = process.env.node_env == "production";

const aliasSettings = createAliasSetting({
	"@": `${path.resolve(__dirname, "./src")}`
});

Object.values(aliasSettings["import/resolver"])[1].extensions.push(".ts");

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/recommended",
		"@vue/airbnb",
		"@vue/typescript/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	settings: {
		...aliasSettings,
	},
	rules: {
		"eqeqeq": "off",
		"indent": ["warn", "tab"],
		"no-console": isProductionBuild ? "warn" : "off",
		"no-continue": "off",
		"no-debugger": isProductionBuild ? "warn" : "off",
		"no-multiple-empty-lines": ["warn", {
			"max": 2,
		}],
		"no-restricted-syntax": "off",
		"no-tabs": ["warn", {
			"allowIndentationTabs": true,
		}],
		"no-trailing-spaces": "warn",
		"quotes": ["error", "double"],

		"import/extensions": [
			"error",
			"always",
			{
				"ts": "never",
			},
		],
		"import/newline-after-import": [
			isProductionBuild ? "error" : "warn",
			{
				"count": 2
			}
		],

		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		
		"vue/eqeqeq": "off",
		"vue/html-button-has-type": "off",
		"vue/html-closing-bracket-spacing": ["warn", {
			"selfClosingTag": "never",
		}],
		"vue/html-indent": ["warn", "tab"],
		"vue/html-self-closing": ["warn", {
			"html": {
				"void": "always",
			},
		}],
		"vue/multi-word-component-names": "off",
		"vue/no-unused-components": "warn",

		"vuejs-accessibility/form-control-has-label": "off",
		"vuejs-accessibility/mouse-events-have-key-events": "off",
		"vuejs-accessibility/tabindex-no-positive": "off",
	},
};
