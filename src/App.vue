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
		"normal": #a8a77a,
		"fighting": #c22e28,
		"flying": #a98ff3,
		"poison": #a33ea1,
		"ground": #e2bf65,
		"rock": #b6a136,
		"bug": #a6b91a,
		"ghost": #735797,
		"steel": #b7b7ce,
		"fire": #ee8130,
		"water": #6390f0,
		"grass": #7ac74c,
		"electric": #f7d02c,
		"psychic": #f95587,
		"ice": #06d9d6,
		"dragon": #6f35fc,
		"dark": #705646,
		"fairy": #d685ad,
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
