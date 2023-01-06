#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token not entered');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('City not entered');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	} catch (e) {
		printError(e.message)
	}
}

const getForcast = async () => {
	try {
		const city = await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('The city is entered incorrectly');
		} else if (e?.response?.status === 401) {
			printError('The token is entered incorrectly');
		} else {
			printError(e.message);
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForcast();
};

initCLI();