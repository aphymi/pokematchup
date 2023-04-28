import { PType } from "@/types/ptype";

/**
 * A description of a particular pokemon species.
 */
export interface PokemonSpecies {
	/** The species' national pokedex number. */
	dexNumber: number;

	/** The species' machine-readable name. */
	name: string;

	/** The species' human-readable name. */
	displayName: string;

	/** A nonempty list of forms for this species. */
	forms: PokemonForm[];
}

/**
 * A description of a particular form of a pokemon species.
 */
export interface PokemonForm {
	/** The name of this form; null if form is default/has no special name. */
	name: string | null;

	/** The primary type of this form. */
	primaryType: PType;
	/** The secondary type of this form, if any. */
	secondaryType: PType | null;
}
