/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";

import axios from "axios";


const listDir = "./src/assets";
const listFile = "pokemon.json";
const spriteDir = "./public/sprites";

async function backupList() {
	const backupName = `${listFile}.${Date.now()}.bak`;
	await fs.promises.copyFile(
		`${listDir}/${listFile}`,
		`${listDir}/${backupName}`,
	);
}

function mergePokemon(oldPokemon, newPokemon) {
	const formsAsMap = new Map();
	for (const form of oldPokemon.forms) {
		formsAsMap.set(form.name ?? "", form);
	}

	for (const newForm of newPokemon.forms) {
		const alreadyKnown = formsAsMap.has(newForm.name ?? "");
		if (alreadyKnown) {
			continue;
		}

		const equivalentToKnown = [...formsAsMap.values()].some(
			(oldForm) => (
				oldForm.primaryType == newForm.primaryType
				&& oldForm.secondaryType == newForm.secondaryType
			),
		);
		if (equivalentToKnown) {
			continue;
		}

		formsAsMap.set(newForm.name ?? "", newForm);
	}

	return {
		dexNumber: oldPokemon.dexNumber,
		name: oldPokemon.name,
		forms: [...formsAsMap.values()],
	};
}

export async function mergeIntoList(newData) {
	const currentList = JSON.parse(
		(await fs.promises.readFile(`${listDir}/${listFile}`)).toString(),
	);

	const listAsMap = new Map();
	for (const pokemon of currentList) {
		listAsMap.set(pokemon.dexNumber, pokemon);
	}

	for (const newPokemon of newData) {
		// TODO Handle sprites

		if (!listAsMap.has(newPokemon.dexNumber)) {
			listAsMap.set(newPokemon.dexNumber, newPokemon);
		} else {
			const oldPokemon = listAsMap.get(newPokemon.dexNumber);
			listAsMap.set(
				oldPokemon.dexNumber,
				mergePokemon(oldPokemon, newPokemon),
			);
		}
	}

	const newList = [...listAsMap.values()];
	newList.sort((a, b) => a.dexNumber - b.dexNumber);

	return newList;
}

export async function writeToList(newData) {
	await backupList();

	for (const pokemon of newData) {
		for (const form of pokemon.forms) {
			if (form.sprite != undefined) {
				let spriteName = (
					pokemon.dexNumber.toString().padStart(4, "0")
				);

				if (form.name != null) {
					spriteName += `-${form.name.replace(" ", "_")}`;
				}
				spriteName += ".png";

				const spritePath = `${spriteDir}/${spriteName}`;

				if (!fs.existsSync(spritePath)) {
					// Purposely awaiting inside loop to limit API hit rate
					// eslint-disable-next-line no-await-in-loop
					const spriteResponse = await axios.get(
						form.sprite,
						{ responseType: "stream" },
					);
					// eslint-disable-next-line no-await-in-loop
					await fs.promises.writeFile(
						spritePath,
						spriteResponse.data,
					);
				}

				delete form.sprite;
			} else if (form.sprite === null) {
				delete form.sprite;
			}
		}
	}

	await fs.promises.writeFile(
		`${listDir}/${listFile}`,
		JSON.stringify(newData, null, "\t"),
	);
}
