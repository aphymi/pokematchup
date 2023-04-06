/* eslint-disable */

const isProductionBuild = process.env.node_env == "production";

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

		"import/newline-after-import": [
			isProductionBuild ? "error" : "warn",
			{
				"count": 2
			}
		],

		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		
		"vue/html-closing-bracket-spacing": ["warn", {
			"selfClosingTag": "never",
		}],
		"vue/html-indent": ["warn", "tab"],
		"vue/html-self-closing": ["warn", {
			"html": {
				"void": "always",
			},
		}],
		"vue/no-unused-components": "warn",
	},
};
