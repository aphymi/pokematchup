/**
 * An enum of pokemon types.
 */
export enum PType {
	NORMAL = "NORMAL",
	FIGHTING = "FIGHTING",
	FLYING = "FLYING",
	POISON = "POISON",
	GROUND = "GROUND",
	ROCK = "ROCK",
	BUG = "BUG",
	GHOST = "GHOST",
	STEEL = "STEEL",
	FIRE = "FIRE",
	WATER = "WATER",
	GRASS = "GRASS",
	ELECTRIC = "ELECTRIC",
	PSYCHIC = "PSYCHIC",
	ICE = "ICE",
	DRAGON = "DRAGON",
	DARK = "DARK",
	FAIRY = "FAIRY",
}

/**
 * A list of pokemon types in the form of strings.
 */
export const ptypeList: PType[] = Object.values(PType);

/**
 * Return the PType value representing the given string.
 *
 * @param str - The name of a PType.
 *
 * @example
 * // Returns PType.STEEL
 * convertStringToPType("steel");
 */
export function convertStringToPType(str: string): PType {
	return str.toUpperCase() as PType;
}

// Alias of PType for convenience.
const T = PType;

/**
 * A mapping of mappings to represent the various type interactions.
 *
 * Top-level key represents attacking type, inner key represents defending type,
 *   and the value of the inner map represents the effectiveness of an attack of
 *   the attacking type against a defender of the defending type, with no
 *   secondary type. If omitted combination has no special interaction (and so
 *   is equal to 1).
 */
const matchupMapping: {[key: string]: {[key: string]: number}} = {
	[T.NORMAL]: {
		[T.ROCK]: 0.5,
		[T.GHOST]: 0,
		[T.STEEL]: 0.5,
	},

	[T.FIGHTING]: {
		[T.NORMAL]: 0.5,
		[T.FLYING]: 0.5,
		[T.POISON]: 0.5,
		[T.ROCK]: 2,
		[T.BUG]: 0.5,
		[T.GHOST]: 0,
		[T.STEEL]: 2,
		[T.PSYCHIC]: 0.5,
		[T.ICE]: 2,
		[T.DARK]: 2,
		[T.FAIRY]: 0.5,
	},

	[T.FLYING]: {
		[T.FIGHTING]: 2,
		[T.ROCK]: 0.5,
		[T.BUG]: 2,
		[T.STEEL]: 0.5,
		[T.GRASS]: 2,
		[T.ELECTRIC]: 0.5,
	},

	[T.POISON]: {
		[T.POISON]: 0.5,
		[T.GROUND]: 0.5,
		[T.ROCK]: 0.5,
		[T.GHOST]: 0.5,
		[T.STEEL]: 0,
		[T.GRASS]: 2,
		[T.FAIRY]: 2,
	},

	[T.GROUND]: {
		[T.FLYING]: 0,
		[T.POISON]: 2,
		[T.ROCK]: 2,
		[T.BUG]: 0.5,
		[T.STEEL]: 2,
		[T.FIRE]: 2,
		[T.GRASS]: 0.5,
		[T.ELECTRIC]: 2,
	},

	[T.ROCK]: {
		[T.FIGHTING]: 0.5,
		[T.FLYING]: 2,
		[T.GROUND]: 0.5,
		[T.BUG]: 2,
		[T.STEEL]: 0.5,
		[T.FIRE]: 2,
		[T.ICE]: 2,
	},

	[T.BUG]: {
		[T.FIGHTING]: 0.5,
		[T.FLYING]: 0.5,
		[T.POISON]: 0.5,
		[T.GHOST]: 0.5,
		[T.STEEL]: 0.5,
		[T.FIRE]: 0.5,
		[T.GRASS]: 2,
		[T.PSYCHIC]: 2,
		[T.DARK]: 0.5,
		[T.FAIRY]: 0.5,
	},

	[T.GHOST]: {
		[T.NORMAL]: 0,
		[T.GHOST]: 2,
		[T.PSYCHIC]: 2,
		[T.DARK]: 0.5,
	},

	[T.STEEL]: {
		[T.ROCK]: 2,
		[T.STEEL]: 0.5,
		[T.FIRE]: 0.5,
		[T.WATER]: 0.5,
		[T.ELECTRIC]: 0.5,
		[T.ICE]: 2,
		[T.FAIRY]: 2,
	},

	[T.FIRE]: {
		[T.ROCK]: 0.5,
		[T.BUG]: 2,
		[T.STEEL]: 2,
		[T.FIRE]: 0.5,
		[T.WATER]: 0.5,
		[T.GRASS]: 2,
		[T.ICE]: 2,
		[T.DRAGON]: 0.5,
	},

	[T.WATER]: {
		[T.GROUND]: 2,
		[T.ROCK]: 2,
		[T.FIRE]: 2,
		[T.WATER]: 0.5,
		[T.GRASS]: 0.5,
		[T.DRAGON]: 0.5,
	},

	[T.GRASS]: {
		[T.FLYING]: 0.5,
		[T.POISON]: 0.5,
		[T.GROUND]: 2,
		[T.ROCK]: 2,
		[T.BUG]: 0.5,
		[T.STEEL]: 0.5,
		[T.FIRE]: 0.5,
		[T.WATER]: 2,
		[T.GRASS]: 0.5,
		[T.DRAGON]: 0.5,
	},

	[T.ELECTRIC]: {
		[T.FLYING]: 2,
		[T.GROUND]: 0,
		[T.WATER]: 2,
		[T.GRASS]: 0.5,
		[T.ELECTRIC]: 0.5,
		[T.DRAGON]: 0.5,
	},

	[T.PSYCHIC]: {
		[T.FIGHTING]: 2,
		[T.POISON]: 2,
		[T.STEEL]: 0.5,
		[T.PSYCHIC]: 0.5,
		[T.DARK]: 0,
	},

	[T.ICE]: {
		[T.FLYING]: 2,
		[T.GROUND]: 2,
		[T.STEEL]: 0.5,
		[T.FIRE]: 0.5,
		[T.WATER]: 0.5,
		[T.GRASS]: 2,
		[T.ICE]: 0.5,
		[T.DRAGON]: 2,
	},

	[T.DRAGON]: {
		[T.STEEL]: 0.5,
		[T.DRAGON]: 2,
		[T.FAIRY]: 0,
	},

	[T.DARK]: {
		[T.FIGHTING]: 0.5,
		[T.GHOST]: 2,
		[T.PSYCHIC]: 2,
		[T.DARK]: 0.5,
		[T.FAIRY]: 0.5,
	},

	[T.FAIRY]: {
		[T.FIGHTING]: 2,
		[T.POISON]: 0.5,
		[T.STEEL]: 0.5,
		[T.FIRE]: 0.5,
		[T.DRAGON]: 2,
		[T.DARK]: 2,
	},
};


/**
 * Get the effectiveness multiplier for the given type matchup.
 *
 * @param attacking - The type of the incoming attack.
 * @param defending - The primary type of the defending pokemon.
 * @param defendingSecondary - The secondary type of the defending pokemon, if any.
 */
export function getTypeMatchup(
	attacking: PType,
	defending: PType,
	defendingSecondary?: PType | null,
): number {
	if (defendingSecondary == null) {
		const matchup = matchupMapping[attacking][defending];

		if (matchup === undefined) {
			// If this particular matchup isn't represented in the matchup
			//   listing, assume no special effect.
			return 1;
		}
		return matchup;
	}
	// If the defender has two types, the attacker's matchup against it is
	//   equal to the product of the attacker's matchups against each of the
	//   defender's individual types.
	return (
		getTypeMatchup(attacking, defending)
			* getTypeMatchup(attacking, defendingSecondary)
	);
}
