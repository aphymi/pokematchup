import { PType } from "@/types/ptype";

/**
 * A description of a particular pokemon species.
 */
export interface PokemonSpecies {
	/** The species' national pokedex number. */
	dexNumber: number;
	
	/** The species' name. */
	name: string;
	
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
	
	/** A base64-encoded PNG image for the form's sprite. */
	spriteData: string | null;
}
