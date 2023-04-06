<template>
	<div
		:class="{
			result: true,
			zero: result == 0,
			half: result == .5,
			basic: result == 1,
			double: result == 2,
		}"
	>
		<template v-if="result == 0">
			0
		</template>
		<template v-else-if="result == .5">
			½
		</template>
		<template v-else-if="result == 2">
			2
		</template>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import { PType, getTypeMatchup } from "@/types/ptype";


export default Vue.extend({
	name: "MatchupChartResult",

	props: {
		attackingType: {
			type: String as () => PType,
			required: true,
		},
		defendingType: {
			type: String as () => PType,
			required: true,
		},
	},

	computed: {
		result(): number {
			return getTypeMatchup(
				this.attackingType,
				this.defendingType,
			);
		},
	},
});
</script>

<style scoped lang="scss">
	.result {
		display: grid;
		place-content: center;

		// Without this rule, the numbers are ever-so-slightly off-center within
		// their box.
		padding-top: 1px;

		color: white;
	}
	.zero {
		background-color: black;
	}

	.half {
		background-color: red;
	}

	.double {
		background-color: green;
	}
</style>
