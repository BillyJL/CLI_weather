import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Without parameters - weather output
		-s [CITY] - set the city
		-h - output help
		-t [API_KEY] - saving token
		`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgBlue(' WEATHER FORCAST ')} Weather in ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (Feels like: ${res.main.feels_like})
		Humidity: ${res.main.humidity}
		Wind speed: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };