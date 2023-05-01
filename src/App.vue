<template>
	<div id="vue-app">
		<nav id="nav">
			<!--
				Ignoring the content newline rule here due to having the
				newlines causing the hyperlinked text to have a space on either
				side within the element. This causes the hyperlink underline to
				extend past the word, which is undesirable.
			-->
			{{/* eslint-disable vue/singleline-html-element-content-newline */}}
			<router-link to="/">Search</router-link> |
			<router-link to="/chart">Type Chart</router-link><!-- |
			<router-link to="/">Interactive Matchups</router-link> -->
			{{/* eslint-disable vue/singleline-html-element-content-newline */}}
		</nav>
		<div id="router-view">
			<router-view/>
		</div>
	</div>
</template>

<style lang="scss">
	:root {
		--background-color: #2c3e50;
		--foreground-color: #fdcf2f;
		--foreground-accent: #fffa;
		--text-color: white;
	}

	body {

		background-color: var(--background-color);
		color: var(--foreground-color);
	}

	#vue-app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;

		min-height: 100vh;
		height: auto;
		min-width: 100%;

		display: grid;
		grid-template-areas:
			". nav ."
			". view .";
		$spacer-column: minmax(0, 1fr);
		grid-template-rows: auto 1fr;
		grid-template-columns: $spacer-column minmax(auto, 6fr) $spacer-column;
	}

	#nav {
		grid-area: nav;
		padding: 30px;

		a {
			font-weight: bold;
			color: var(--foreground-color);
		}
	}

	#router-view {
		grid-area: view;
		padding-bottom: 1rem;
	}

	$type-colors: (
		"normal": #818181,
		"fighting": #c22e28,
		"flying": #72accf,
		"poison": #a33ea1,
		"ground": #a5723d,
		"rock": #a9a46c,
		"bug": #9da125,
		"ghost": #6d4a76,
		"steel": #91b2cb,
		"fire": #e6613c,
		"water": #2e99e2,
		"grass": #51a33e,
		"electric": #dcbc25,
		"psychic": #f95587,
		"ice": #16d5d2,
		"dragon": #5c5fca,
		"dark": #4f4546,
		"fairy": #da84cb,
	);

	:root {
		@each $type, $color in $type-colors {
			--ptype-color-#{$type}: #{$color};
		}
	}

	@each $type, $color in $type-colors {
		.bg-color-ptype-#{$type} {
			background-color: var(--ptype-color-#{$type});
		}
	}
</style>
