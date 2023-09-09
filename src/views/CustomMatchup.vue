<template>
	<div class="custom-matchup">
		<div class="primary-type-selector">
			<h2>Primary type</h2>

			<TypeSelector
				v-model="primaryType"
			/>
		</div>

		<div class="secondary-type-selector">
			<h2>Secondary type</h2>

			<TypeSelector
				v-model="secondaryType"
				allow-none
			/>
		</div>

		<div class="matchup-block">
			<h2>Matchup</h2>

			<BaseMatchupBlock
				:primary-type="primaryType"
				:secondary-type="secondaryType"
			>
				<template #defender-info>
					<div class="defender-info">
						<MatchupTypeBlock
							:type="primaryType"
						/>

						<MatchupTypeBlock
							v-if="secondaryType != null"
							:type="secondaryType"
						/>
					</div>
				</template>
			</BaseMatchupBlock>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import TypeSelector from "@/components/TypeSelector.vue";
import { ptypeList } from "@/types/ptype";
import BaseMatchupBlock from "@/components/BaseMatchupBlock.vue";
import MatchupTypeBlock from "@/components/MatchupTypeBlock.vue";


export default Vue.extend({
	name: "CustomMatchup",

	components: {
		TypeSelector,
		BaseMatchupBlock,
		MatchupTypeBlock,
	},

	data: () => ({
		primaryType: ptypeList[0],
		secondaryType: null,
	}),
});
</script>

<style scoped lang="scss">
	.custom-matchup {
		// max-width: 80rem;

		display: grid;
		grid-template:
			"primary-type secondary-type" minmax(15rem, 1fr)
			"matchup-block matchup-block" 1fr
			/ 1fr 1fr
		;
		gap: 0.5rem;

		$selector-gap: 6rem;

		> .primary-type-selector {
			grid-area: primary-type;
			justify-self: end;
			padding-right: calc($selector-gap / 2);
		}

		> .secondary-type-selector {
			grid-area: secondary-type;
			justify-self: start;
			padding-left: calc($selector-gap / 2);
		}

		> .matchup-block {
			grid-area: matchup-block;
		}
	}

	.primary-type-selector, .secondary-type-selector {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.defender-info {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		gap: 0.3rem;
	}
</style>
