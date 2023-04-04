<template>
	<span
		:class="`type-block bg-color-ptype-${type.toLowerCase()}`"
	>
		{{ getTypeName(type) }}
	</span>
</template>

<script lang="ts">
import Vue from "vue";

import { PType } from "@/types/ptype";
import toTitleCase from "@/utils/titleCase";


export default Vue.extend({
	props: {
		type: {
			type: String as () => PType,
			required: true,
		},
	},

	methods: {
		getTypeName(type: PType): string {
			return toTitleCase(type);
		},
	},
});
</script>

<!--
I can't scope the CSS, because scoped CSS seems to not get applied to the root
element of a functional component, and since this component is entirely made of
a single element, the scoped CSS doesn't get applied at all.

I tried adding a wrapper element to make it work anyway, but that caused weird
height calculation issues.
-->
<style lang="scss">
	.type-block {
		padding: .35em .9ch;
		border: 2px solid white;
		border-radius: .5em;
		color: white;
		line-height: 1em;
		width: 7.5ch;
		text-align: center;
	}
</style>
