#!/usr/bin/env node

const meow = require('meow');
const axios = require("axios")
const chalk = require("chalk")
const cli = meow(`
	Usage
	  $ freeRoom <Download Directory>
	Options
`, {

});
(async () => {
    let response = await axios.get(`https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/now?suppress_error=false
    `);
    console.log("Current Free Rooms:")
    response.data.locations.forEach(location => {

        console.log(chalk.green(location.building+ ""+ location.room));
    });

})();
