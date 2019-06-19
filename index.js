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
  console.log(chalk.blue.bold("current free rooms:"))

  let currentDay = Number(moment(Date.now()).day())-1;
  let midnight = moment(`${moment(Date.now()).month()+1} ${moment(Date.now()).date()} 00:00:00`, "MM DD hh:mm:ss") 
  let roomsToday = await axios.get(`http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/${currentDay}?suppress_error=false`);
  roomsToday.data.freeRooms.forEach(room => {
    let startTime = midnight.clone()
    let endTime = midnight.clone()
   
    startTime.add(room.startTime,"m")
    endTime.add(room.endTime,"m")
   
    if(!endTime.isBefore(moment(Date.now()))){
    console.log(chalk.blue.bold("from ",startTime.format("HH:mm"),"-",endTime.format("HH:mm")+":"))
    room.locations.forEach(loc => {
      process.stdout.write(chalk.green(loc.building + "" + loc.room+"  "));
    });
    console.log()
    console.log()
  }

  });
  midnight.add(roomsToday.data.freeRooms[0].startTime, "m")
})();