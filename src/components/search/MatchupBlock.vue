<template>
	<div class="matchup-container">
		<defender-info
			class="defender-info"
			:species="species"
			:form="form"
		/>
		<div
			v-for="{effectiveness, types} in matchupSpread"
			:key="effectiveness"
			class="matchup-result"
			:style="{ 'grid-area': `x${effectiveness}`.replace('.', 'dot') }"
			>
			
			<span class="matchup-effectiveness">x{{ effectiveness }}</span>
			
			<div class="type-stack">
				<type-block
					v-for="type in types"
					:key="type"
					:type="type"
				/>
			</div>
			
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	
	import { PType, ptypeList, getTypeMatchup } from "@/ptype";
	import { PokemonSpecies, PokemonForm } from "@/pokemon";
	
	import TypeBlock from "@/components/search/MatchupTypeBlock.vue";
	import DefenderInfo from "@/components/search/MatchupBlockDefenderInfo.vue";
	
	/**
	 * A single effectiveness multiplier, and a list of attacking types which
	 * give it for a particular pokemon.
	 */
	interface MatchupResult {
		effectiveness: number;
		types: PType[];
	}
	
	
	export default Vue.extend({
		components: {
			TypeBlock,
			DefenderInfo,
		},
		
		props: {
			species: {
				type: Object as () => PokemonSpecies,
				required: true,
			},
			form: {
				type: Object as () => PokemonForm,
				required: true,
			},
		},
		
		computed: {
			matchupSpread(): MatchupResult[] {
				const spreadMap = this.getPokemonMatchupSpread(this.form);
				
				return Array.from(spreadMap).map(([effectiveness, types]) => {
					return {
						effectiveness: effectiveness,
						types: types,
					};
				});
			},
		},
		
		methods: {
			/**
			 * Get the matchup spread for a pokemon with the given types.
			 * 
			 * @param defendingPrimary - The primary type of the defender.
			 * @param defendingSecondary - The secondary type of the defender,
			 *   if any.
			 * 
			 * @returns A map of effectiveness multipliers to lists of types
			 *   which result in that multiplier.
			 */
			getMatchupSpread(
					defendingPrimary: PType,
					defendingSecondary?: PType | null,
					): Map<number, PType[]> {
				
				const matchupSpread: Map<number, PType[]> = new Map();
				[0, .25, .5, 1, 2, 4].forEach((mult) => {
					matchupSpread.set(mult, []);
				});
				
				ptypeList.forEach((attackingType) => {
					const matchup = getTypeMatchup(
						attackingType,
						defendingPrimary,
						defendingSecondary,
					);
					
					matchupSpread.get(matchup)!.push(attackingType);
				});
				
				return matchupSpread;
			},
			
			/**
			 * Get the matchup spread for the given pokemon's type combination.
			 * 
			 * @param pokemonForm - The form to get the type matchup for.
			 * 
			 * @returns A map of effectiveness multipliers to lists of types
			 *   which result in that multiplier.
			 */
			getPokemonMatchupSpread(
					pokemonForm: PokemonForm,
					): Map<number, PType[]> {
				
				return this.getMatchupSpread(
					pokemonForm.primaryType,
					pokemonForm.secondaryType,
				);
			},
		},
	});
</script>

<style lang="scss" scoped>
	.matchup-container {
		--matchup-border: 3px solid var(--foreground-color);
		border: var(--matchup-border);
		border-radius: 1.5em;
		
		display: grid;
		// Periods are apparently disallowed in grid area names, so they're
		//   replaced with 'dot' here.
		grid-template-areas:
			"info x0"
			"info x0dot25"
			"info x0dot5"
			"info x1"
			"info x2"
			"info x4";
		
		grid-template-rows: repeat(6, auto); 
		grid-template-columns: auto 1fr;
		
		> div {
			padding: 1em;
		}
	}
	
	.defender-info {
		grid-area: info;
		border-right: var(--matchup-border);
	}
	
	.defender-types > .type-block {
		display: block;
		
		&:first-child:not(:last-child) {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		&:last-child:not(:first-child) {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}
	
	.matchup-result {
		display: grid;
		grid-template-areas:
			"effectivness type-stack";
		grid-template-columns: auto 1fr;
		justify-items: flex-start;
		
		&:not(:last-child) {
			border-bottom: var(--matchup-border);
		}
	}
	
	.type-stack {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		align-content: center;
		justify-content: flex-start;
		
		> * {
			margin-bottom: .3em;
		}
	}
	
	.matchup-effectiveness {
		display: block;
		font-weight: bold;
		font-size: 2rem;
		width: 5ch;
		text-align: left;
	}
</style>
