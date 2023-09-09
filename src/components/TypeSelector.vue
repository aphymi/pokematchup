<template>
	<div class="type-selector">
		<button
			v-for="type in ptypeList"
			:key="type"
			:class="{
				['type-button']: true,
				[`bg-color-ptype-${type.toLowerCase()}`]: true,
				selected: value == type,
			}"
			@click="$emit('input', type)"
		>
			{{ toTitleCase(type) }}
		</button>

		<button
			v-if="allowNone"
			:class="{
				'type-button': true,
				'selected': value == null,
				'none-button': true,
			}"
			@click="$emit('input', null)"
		>
			(None)
		</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import { PType, ptypeList } from "@/types/ptype";
import toTitleCase from "@/utils/titleCase";


export default Vue.extend({
	name: "TypeSelector",

	props: {
		value: {
			type: String as () => PType,
			default: ptypeList[0],
		},
		allowNone: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		ptypeList: () => ptypeList,
	},

	methods: {
		toTitleCase,
	},
});
</script>

<style scoped lang="scss">
	$outer-border-radius: 0.5rem;
	$inner-border-radius: 0.3rem;

	.type-selector {
		display: flex;
		flex-flow: column nowrap;

		width: 8rem;
		border: 3px solid var(--foreground-color);
		border-radius: $outer-border-radius;

		> :first-child {
			border-top-left-radius: $inner-border-radius;
			border-top-right-radius: $inner-border-radius;
		}

		> :last-child {
			border-bottom-left-radius: $inner-border-radius;
			border-bottom-right-radius: $inner-border-radius;
		}
	}

	.type-button {
		border: none;
		color: var(--text-color);
		font-size: 1rem;
		padding: 0.3rem;
		cursor: pointer;

		&.none-button {
			// color: black;
			background-color: #aaa;
		}

		&:not(:last-child) {
			border-bottom: 0.1rem solid #fffa;
		}

		&.selected {
			font-weight: bold;
			// text-decoration: underline;

			&::before {
				content: ">";
			}

			&::after {
				content: "<";
			}
		}
	}
</style>
