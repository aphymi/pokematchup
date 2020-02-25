<template>
	<div class="defender-info">
		<img :src="spriteImageURL"/>
		
		<span class="dex-number">
			#{{ species.dexNumber.toString().padStart(3, "0") }}
		</span>
		
		<span class="name">
			{{ titleCase(species.name) }}
		</span>
		
		<span class="form-name" v-if="form.name != null">
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
	
	import TypeBlock from "@/components/search/MatchupTypeBlock.vue";
	
	import { PokemonSpecies, PokemonForm } from "@/pokemon";
	import { PType } from "@/ptype";
	
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
					.padStart(3, "0")
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
			titleCase(str) {
				// I can think of exactly one case where the following regex
				// method will give an undesired result; "Kommo-o".
				// As such, we'll mark it as a special exception for now. We can
				// re-evaluate this approach in the future if there are
				// exceptions I'm missing, or if new ones are added.
				if (str == "kommo-o") {
					return "Kommo-o";
				}
				
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
		
		> img {
			height: 96px;
			width: 96px;
		}
		
		.dex-number,
		.name {
			font-size: larger;
		}
		
		.defender-types {
			display: flex;
			flex-flow: column nowrap;
		}
	}
</style>
