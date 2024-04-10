<template>
	<div class="chart-container">
		<table
			:class="{
				chart: true,
				'has-highlight': highlightedAttacker || highlightedDefender,
			}"
		>
			<thead>
				<tr>
					<th class="corner-header">
						<div>
							<div class="background-triangle"/>

							<span class="attacker">Attacker</span>

							<span class="defender">Defender</span>
						</div>
					</th>

					<th
						v-for="defenderType in types"
						:key="defenderType"
						class="defender-header"
						@mouseenter="hoverType(
							defenderType,
							'defender',
						)"
						@mouseleave="hoverType(null, 'defender')"
						@click="clickType(defenderType, 'defender')"
					>
						<matchup-type-block
							:class="{
								'defender-type': true,
								highlighted: (
									defenderType == highlightedDefender
								),
							}"
							:type="defenderType"
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="attackerType in types"
					:key="attackerType"
				>
					<th
						class="attacker-header"
						scope="row"
						@mouseenter="hoverType(attackerType, 'attacker')"
						@mouseleave="hoverType(null, 'attacker')"
						@click="clickType(attackerType, 'attacker')"
					>
						<matchup-type-block
							:class="{
								'attacker-type': true,
								highlighted: (
									attackerType == highlightedAttacker
								),
							}"
							:type="attackerType"
						/>
					</th>

					<td
						v-for="defenderType in types"
						:key="defenderType"
					>
						<matchup-chart-result
							:attacking-type="attackerType"
							:defending-type="defenderType"
							:class="{
								highlighted: (
									attackerType == highlightedAttacker
									|| defenderType == highlightedDefender
								),
							}"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import MatchupTypeBlock from "@/components/MatchupTypeBlock.vue";
import MatchupChartResult from "@/components/MatchupChartResult.vue";
import { PType, getTypeMatchup, ptypeList } from "@/types/ptype";
import toTitleCase from "@/utils/titleCase";


const highlightEnabled = false;

export default Vue.extend({
	name: "MatchupChart",

	components: {
		MatchupTypeBlock,
		MatchupChartResult,
	},

	data: () => ({
		hoverHighlightedDefender: null as PType | null,
		clickHighlightedDefender: null as PType | null,

		hoverHighlightedAttacker: null as PType | null,
		clickHighlightedAttacker: null as PType | null,
	}),

	computed: {
		types(): PType[] {
			return ptypeList;
		},

		highlightedDefender(): PType | null {
			return (
				this.hoverHighlightedDefender
				?? this.clickHighlightedDefender
			);
		},

		highlightedAttacker(): PType | null {
			return (
				this.hoverHighlightedAttacker
				?? this.clickHighlightedAttacker
			);
		},
	},

	methods: {
		getTypeMatchup,
		titleCase: toTitleCase,
		hoverType(
			type: PType | null,
			defenderOrAttacker: string,
		): void {
			if (!highlightEnabled) {
				return;
			}

			const attr = (
				`hoverHighlighted${toTitleCase(defenderOrAttacker)}`
			);

			this[attr] = type;
		},
		clickType(type: PType, defenderOrAttacker: string): void {
			if (!highlightEnabled) {
				return;
			}

			const attr = (
				`clickHighlighted${toTitleCase(defenderOrAttacker)}`
			);

			if (this[attr] == type) {
				this[attr] = null;
			} else {
				this[attr] = type;
			}
		},
	},
});
</script>

<style scoped lang="scss">
	$type-width: 7.5ch;
	$type-height: 1.1em;

	.corner-header > div {
		--attacker-color: #bf004f;
		--defender-color: #00a1e9;

		display: grid;

		grid-template:
			"defender" 1fr
			"attacker" auto
			/ 1fr
		;
		height: 100%;
		background-color: var(--defender-color);
		color: #fff;

		> .background-triangle {
			grid-row: 1 / -1;
			grid-column: 1 / -1;

			background-color: var(--attacker-color);

			clip-path: polygon(0 0, 0 100%, 100% 100%);
		}

		> .attacker {
			grid-area: attacker;
			justify-self: start;
			align-self: start;

			// `.background-triangle`'s `clip-path` creates a new stacking
			// context, so `.attacker` needs a no-op attr here to create another
			// stacking context and keep it on top.
			transform: rotate(0);
		}

		> .defender {
			grid-area: defender;
			justify-self: end;
		}
	}

	.defender-header {
		writing-mode: vertical-lr;
		rotate: 180deg;
	}

	.defender-type {
		width: unset;
		height: $type-width;
		line-height: .7em;
	}

	.attacker-type {
		line-height: 1em;
		width: $type-width;
	}

	.defender-type, .attacker-type {
		border: none;
		border-radius: 0;
		display: inline-block;
	}

	.chart-container {
		display: grid;
		justify-content: center;
	}

	.chart {
		border-collapse: collapse;
		font-size: 1.3rem;

		th, td {
			padding: 0;
			border: solid 2px;
		}

		th {
			border-color: white;
		}

		td {
			border-color: var(--foreground-accent);
		}

		// The following are necessary to make cell contents fill their cells.
		height: 1px;

		> tbody > tr {
			height: 100%;
			> td {
				height: 100%;
				> * {
					height: 100%;
				}
			}
		}
	}

	.chart.has-highlight {
		th, td {
			> :not(.highlighted) {
				opacity: 0.4;
			}
		}
	}
</style>
