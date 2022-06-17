const EleventyFetch = require("@11ty/eleventy-fetch");
require('dotenv').config();

module.exports = async function () {

	// This API Key is READONLY, on public data, this is under control	
	const API_KEY = 'keygc919YSkuyLBXY';
	const BASE_ID = 'app2RUotDJV0yzK71';
	const TABLE_ID = 'tblsleW9gqttBLFkS';
	const VIEW = process.env.AIRTABLE_VIEW;


	let json = await EleventyFetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=100&view=${VIEW}`, {
		duration: "15m",
		type: "json",
		verbose: true,
		fetchOptions: {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${API_KEY}`
			}
		}
	});

	const tasks = [];

	for (const key in json.records) {
		if (Object.hasOwnProperty.call(json.records, key)) {
			const element = json.records[key];

			console.log("TASK");
			console.log(element);

			const task = {
				name: element.fields.Name,
				done: element.fields.isdone ? true : false,
				actor: element.fields.ACTOR,
			};

			tasks.push(task);

		}
	}

	return tasks;

}