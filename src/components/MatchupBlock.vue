<template>
	<BaseMatchupBlock
		:primary-type="form.primaryType"
		:secondary-type="form.secondaryType"
	>
		<template #defender-info>
			<defender-info
				:species="species"
				:form="form"
			/>
		</template>
	</BaseMatchupBlock>
</template>

<script lang="ts">
import Vue from "vue";

import { PType, ptypeList, getTypeMatchup } from "@/types/ptype";
import { PokemonSpecies, PokemonForm } from "@/types/pokemon";

import DefenderInfo from "@/components/MatchupBlockDefenderInfo.vue";
import BaseMatchupBlock from "@/components/BaseMatchupBlock.vue";


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
		DefenderInfo,
		BaseMatchupBlock,
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

			return Array.from(spreadMap).map(([effectiveness, types]) => ({
				effectiveness,
				types,
			}));
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
			[0, 0.25, 0.5, 1, 2, 4].forEach((mult) => {
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
			 * Get the matchup spread for the given pokemon"s type combination.
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
</style>
