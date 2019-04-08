#!/usr/bin/env node

const meow = require('meow');
const axios = require("axios")
const chalk = require("chalk")
const moment = require("moment")
const cli = meow(`
	Usage
	  $ freeRoom <Download Directory>
  Options
    -t, --today get all free rooms Today
`, {

});
(async () => {
  let response = await axios.get(`https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/now?suppress_error=false`);
  console.log("Current Free Rooms:")
  response.data.locations.forEach(location => {
    console.log(chalk.green(location.building + "" + location.room));
  });
  let currentDay = Number(moment(Date.now()).day())-1;
  let midnight = moment("1 00:00:00", "DD hh:mm:ss") 
  let roomsToday = await axios.get(`https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/${currentDay}?suppress_error=false`);
  roomsToday.data.freeRooms.forEach(room => {
    let startTime = midnight.clone()
    let endTime = midnight.clone()
    startTime.add(room.startTime,"m")
    endTime.add(room.endTime,"m")
    console.log(chalk.blue.bgRed.bold("from ",startTime.format("HH:mm"),"-",endTime.format("HH:mm")))
    room.locations.forEach(loc => {
      process.stdout.write(chalk.green(loc.building + "" + loc.room+"  "));
    });
    console.log()
    console.log()

  });
  midnight.add(roomsToday.data.freeRooms[0].startTime, "m")
})();