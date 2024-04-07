/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { ArgumentParser } from "argparse";
import axios from "axios";

import { mergeIntoList, writeToList } from "./pokemon-list.js";


const pokeapiBaseURL = "https://pokeapi.co/api/v2";


async function getSpeciesInfo(speciesNum) {
	const { data: speciesInfo } = await axios.get(
		`${pokeapiBaseURL}/pokemon-species/${speciesNum}`,
	);

	const formattedForms = [];
	const speciesForms = speciesInfo.varieties;

	// Make sure the default form is first.
	// eslint-disable-next-line no-nested-ternary
	speciesForms.sort((a, b) => (a.is_default ? -1 : (b.is_default ? 1 : 0)));

	let firstLoop = true;

	for (const speciesForm of speciesForms) {
		if (firstLoop) {
			firstLoop = false;
		} else {
			// eslint-disable-next-line no-await-in-loop
			await new Promise((resolve) => {
				setTimeout(resolve, 500);
			});
		}

		const { data: speciesFormInfo } = (
			// eslint-disable-next-line no-await-in-loop
			await axios.get(speciesForm.pokemon.url)
		);

		const formPrimaryType = (
			speciesFormInfo.types[0].type.name.toUpperCase()
		);
		const formSecondaryType = speciesFormInfo.types.length > 1 ? (
			speciesFormInfo.types[1].type.name.toUpperCase()
		) : (
			null
		);
		const formEquivalentToKnown = formattedForms.some(
			(oldForm) => (
				formPrimaryType == oldForm.primaryType
				&& formSecondaryType == oldForm.secondaryType
			),
		);
		if (formEquivalentToKnown) {
			continue;
		}

		let formName;
		if (speciesForm.is_default) {
			formName = null;
		} else if (speciesFormInfo.name.startsWith(speciesInfo.name)) {
			formName = speciesFormInfo.name.slice(
				speciesInfo.name.length + 1,
			);
		} else {
			formName = speciesFormInfo.name;
		}

		formattedForms.push({
			name: formName,
			primaryType: speciesFormInfo.types[0].type.name.toUpperCase(),
			secondaryType: speciesFormInfo.types.length > 1 ? (
				speciesFormInfo.types[1].type.name.toUpperCase()
			) : (
				null
			),
			sprite: speciesFormInfo.sprites.front_default,
		});
	}

	const nameObjects = speciesInfo.names;
	const englishNameObject = nameObjects.filter(
		(nameObject) => nameObject.language.name == "en",
	)[0];
	const displayName = englishNameObject.name;

	return {
		dexNumber: Number(speciesNum),
		name: speciesInfo.name,
		displayName,
		forms: formattedForms,
	};
}

async function updateListFromDexNumbers(dexNumbers) {
	const newData = [];

	for (const dexNumber of dexNumbers) {
		// eslint-disable-next-line no-await-in-loop
		newData.push(await getSpeciesInfo(dexNumber));
	}

	await writeToList(
		await mergeIntoList(newData),
	);
}


if (import.meta.url.endsWith(process.argv[1])) {
	const parser = new ArgumentParser({
		description: "Populate the Pokemon JSON with data from the PokeAPI",
	});
	parser.add_argument(
		"-r",
		"--range",
		{
			help: "specify a range of pokedex numbers, e.g. '5-15'",
			action: "append",
		},
	);
	parser.add_argument(
		"-n",
		"--number",
		{
			help: "specify a single pokedex number",
			action: "append",
		},
	);

	const parsed = parser.parse_args();

	const dexNumbers = [];
	for (const range of (parsed.range ?? [])) {
		const [left, right] = range.split("-").map(Number);

		for (let i = left; i <= right; i += 1) {
			dexNumbers.push(i);
		}
	}

	for (const num of (parsed.number ?? [])) {
		dexNumbers.push(Number(num));
	}

	updateListFromDexNumbers(dexNumbers);
}
