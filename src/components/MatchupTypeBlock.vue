<template functional>
	<span
		class="type-block"
		:class="'bg-color-ptype-' + $options.methods.getTypeName(props.type).toLowerCase()"
		>
		
		{{ $options.methods.getTypeName(props.type) }}
		
	</span>
</template>

<script lang="ts">
	import Vue from "vue";
	
	import { PType } from "@/types/ptype";
	
	export default Vue.extend({
		props: {
			type: {
				type: String as () => PType,
				required: true,
			},
		},
		
		methods: {
			getTypeName(type: PType): string {
				const typeString = type;
				
				// Convert the type string to title case.
				return typeString.substring(0, 1).toUpperCase() +
					typeString.substring(1).toLowerCase();
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

