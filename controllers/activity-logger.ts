"use strict";
export { };

const rp = require('request-promise-native');
const constants = require("../constants");

// Private Methods ------------------------------------------------------------>

/**
 * 
 */
const _logQuarterlyActivities = async (token: string) => {
  const startDate = constants.START_DATE;
  const endDate = constants.END_DATE;
  const everyDaySteps = await _getStepsForEachDayOfQuarter(token, startDate, endDate);
  console.log("everyDaySteps: " + JSON.stringify(everyDaySteps));
  everyDaySteps.map(async (log: any) => {
    await new Promise(r => setTimeout(r, 1000));
    if (log.value <= 8000) {
      let missingSteps = 9000 - log.value;
      let mileSteps = 1000;
      let miles = (missingSteps - (missingSteps % mileSteps)) / mileSteps;
      console.log('Improving steps for ' + log.dateTime + ' with steps ' + log.value + ' adding miles ' + miles);
      await _logDaysWalk(token, log.dateTime, miles);
    }
  });
}

const _getStepsForEachDayOfQuarter = async (token: string, startDate: string, endDate: string) => {
  const getActivityURL = "https://api.fitbit.com/1/user/-/activities/steps/date/" + startDate + "/" + endDate + ".json";
  const response = await rp({
    method: 'GET',
    url: getActivityURL,
    headers: {
      "Authorization": "Bearer " + token,
    },
    simple: true, // rejects non-200 status codes
  });
  const jsonResponse = JSON.parse(response);
  return jsonResponse["activities-steps"];
}

const _logDaysWalk = async (token: string, activityDate: string, miles: number) => {
  let response;
  try {
    const activityLogURL = "https://api.fitbit.com/1/user/-/activities.json?activityId=90013&startTime=" + constants.START_TIME + "&durationMillis=1800000&date=" + activityDate + "&distance=" + miles;
    response = await rp({
      method: 'POST',
      url: activityLogURL,
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token,
      },
      simple: true, // rejects non-200 status codes
    });
    console.log(activityDate + ' steps logged: ' + JSON.parse(response).activityLog.steps);
  }
  catch(err) {
    console.error(JSON.stringify(err));
    console.error(JSON.stringify(response));
  }
}

// Public Methods ------------------------------------------------------------->
module.exports.LogQuarterlyActivities = _logQuarterlyActivities;