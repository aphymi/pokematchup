<template>
	<div>
		<input
			type="text"
			class="search-input"
			placeholder="Search by pokemon name"

			tabindex="1"
			:value="searchText"
			@input="updateSearchText($event.target.value)"
		/>

		<div class="search-results">
			<template v-for="pokemonSpecies in searchResults.slice(0, 20)">
				<pokemon-matchup
					v-for="pokemonForm in pokemonSpecies.forms"
					:key="`${pokemonSpecies.name},${pokemonForm.name}`"
					:species="pokemonSpecies"
					:form="pokemonForm"
				/>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { debounce } from "debounce";
import Vue from "vue";

import { PokemonSpecies } from "@/types/pokemon";
import PokemonMatchup from "@/components/MatchupBlock.vue";

import pokemonList from "@/assets/pokemon.json";


export default Vue.extend({
	components: {
		PokemonMatchup,
	},

	data() {
		return {
			pokemonList: pokemonList as PokemonSpecies[],

			searchText: "",
		};
	},

	computed: {
		searchResults(): PokemonSpecies[] {
			return this.pokemonList.filter(
				(pokemon) => (
					pokemon.displayName
						.toLowerCase()
						.includes(this.searchText.toLowerCase())
				),
			);
		},
	},

	methods: {
		/**
		 * Update the searchText data property.
		 * Function is debounced to avoid frequent re-rendering while the
		 *   user is typing.
		 *
		 * @param searchText - The new search text.
		 */
		updateSearchText: debounce(
			function updateSearchText(this: any, searchText: string) {
				this.searchText = searchText;
			},
			200,
		) as (searchText: string) => void,
	},
});

</script>

<style lang="scss" scoped>
	.search-input {
		font-size: 2em;
		background: transparent;
		margin-bottom: 2em;

		color: white;

		border: 2px solid var(--foreground-color);
		border-radius: 5px;
		padding: .3em;
		width: 25ch;

		outline: none;

		&::placeholder {
			color: var(--text-color);
			opacity: 0.6;
		}
	}

	.search-results {
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
	}
</style>
