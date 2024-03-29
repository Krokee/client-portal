const EleventyFetch = require("@11ty/eleventy-fetch");
require('dotenv').config();

module.exports = async function () {

	// This API Key is READONLY, on public data, this is under control	
	const API_KEY = 'keygc919YSkuyLBXY';
	const BASE_ID = 'app2RUotDJV0yzK71';
	const TABLE_ID = 'tbl7oLWMpNVPqean5';
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

	const documents = [];

	for (const key in json.records) {
		if (Object.hasOwnProperty.call(json.records, key)) {
			const element = json.records[key];

			console.log(element);

			const document = {
				title: element.fields.Name,
				date: element.fields.Date,
				type: element.fields.Type,
				description: element.fields.Notes,
				link: element.fields.PJ[0].url,
			};

			documents.push(document);

		}
	}

	return documents.sort((a, b) => a.date - b.date);

}