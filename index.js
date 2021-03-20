const axios = require("axios");
var prompt = require("prompt-sync")();

const API_URL = "https://npiregistry.cms.hhs.gov/api/?version=2.1";

async function makeAPICall(search_params) {
	// Try to make call to NPI API
	try {
		const res = await axios.get(API_URL, { params: search_params });
		const data = res.data;

		if (data["results"] != undefined) {
			console.log("\n*****RESULTS*****");
			console.log(JSON.stringify(data["results"], undefined, 2));
			console.log("Results Count: " + data["result_count"]);
			console.log("Status Code: " + res["status"] + "\n");
		} else {
			console.log("\nERROR: No results for the search fields entered.\n");
		}
	} catch (error) {
		console.log("\n" + error);
	}
}

async function main() {
	console.log("Hello! With thise program you can call the NPI Registry Api.");

	while (true) {
		var response = prompt("Would you like to make a search? (yes/no) ");
		if (response == "yes") {
			search_params = {
				limit: prompt("Search Result Limit: "),
				first_name: prompt("First name: "),
				last_name: prompt("Last Name: "),
				city: prompt("City: "),
				state: prompt("State: "),
				npi: prompt("NPI Number: "),
				postalCode: prompt("Postal Code: "),
				countryCode: prompt("Country Code: "),
			};
			// Set default search result limit to 10 if one is not given
			if (search_params["limit"] == "") {
				search_params["limit"] = "10";
			}

			// Delete unused seaerch fields
			for (key in search_params) {
				if (search_params[key] == "") {
					delete search_params[key];
				}
			}

			await makeAPICall(search_params);
		} else if (response == "no") {
			break;
		}
	}

	console.log("Goodbye!");
}

if (require.main === module) {
	main();
}
