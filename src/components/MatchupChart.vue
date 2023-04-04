<template>
	<div class="chart-container">
		<table class="chart">
			<thead>
				<tr>
					<th class="empty-header"/>
					<th
						v-for="defenderType in types"
						:key="defenderType"
						class="defender-header"
					>
						<matchup-type-block
							class="defender-type"
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
					>
						<matchup-type-block
							class="attacker-type"
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
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import { PType, getTypeMatchup, ptypeList } from "@/types/ptype";
import MatchupTypeBlock from "@/components/MatchupTypeBlock.vue";
import toTitleCase from "@/utils/titleCase";
import MatchupChartResult from "@/components/MatchupChartResult.vue";


export default Vue.extend({
	name: "MatchupChart",

	components: {
		MatchupTypeBlock,
		MatchupChartResult,
	},

	data: () => ({

	}),

	computed: {
		types(): PType[] {
			return ptypeList;
		},
	},

	methods: {
		getTypeMatchup,
		titleCase: toTitleCase,
	},
});
</script>

<style scoped lang="scss">
	$type-width: 7.5ch;

	.empty-header {
		border: none !important;
	}

	.defender-header {
		rotate: 180deg;
		writing-mode: vertical-lr;
	}

	.defender-type {
		width: unset;
		height: $type-width;
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
			border: solid 2px white;
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
</style>
