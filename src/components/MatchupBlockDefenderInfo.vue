<template>
	<div class="defender-info">
		<div class="image-container">
			<img :src="spriteImageURL"/>
		</div>

		<span class="dex-number">
			#{{ species.dexNumber.toString().padStart(3, "0") }}
		</span>

		<span class="name">
			{{ species.displayName }}
		</span>

		<span
			v-if="form.name != null"
			class="form-name"
		>
			({{ titleCase(form.name) }})
		</span>

		<div class="defender-types">
			<type-block
				:type="form.primaryType"
			/>
			<type-block
				v-if="form.secondaryType != null"
				:type="form.secondaryType"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import TypeBlock from "@/components/MatchupTypeBlock.vue";

import { PokemonSpecies, PokemonForm } from "@/types/pokemon";


export default Vue.extend({
	components: {
		TypeBlock,
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
		spriteImageURL(): string {
			const dexNumberString = (
				this.species.dexNumber
					.toString()
					.padStart(4, "0")
			);
			let url = `sprites/${dexNumberString}`;
			if (this.form.name != null) {
				url += `-${this.form.name.replace(" ", "_")}`;
			}
			url += ".png";

			return url;
		},
	},

	methods: {
		titleCase(str: string) {
			return str.replace(
				/\b[a-z]/g,
				(match) => match.toUpperCase(),
			);
		},
	},
});
</script>

<style lang="scss" scoped>
	.defender-info {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		> .dex-number,
		> .defender-types {
			margin-top: 1em;
		}

		> .image-container {
			max-height: 128px;
			max-width: 128px;

			> img {
				max-height: 100%;
				max-width: 100%;
			}
		}

		.dex-number,
		.name {
			font-size: larger;
		}

		.defender-types {
			display: flex;
			flex-flow: column nowrap;
			gap: 0.3rem;
		}
	}
</style>
