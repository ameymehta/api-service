"use strict";
export {};

const rp = require('request-promise-native');
const constants = require("../constants");

// Private Methods ------------------------------------------------------------>

/**
 * 
 */
const _logQuarterlyActivities = async (token: string, userId: string) => {
  const months = constants.MONTHS;
  console.log("months: " + months);

  months.map(async (month: any) => {
    await _logDailyActivity(token, userId, month)
  })
  
}

const _logDailyActivity = async (token: string, userId: string, month: string) => {
  const days = constants.DAYS;
  console.log("days: " + days);
  days.map(async (day: any) => {
    const activityDate = month + '-' + day;
    let steps: number;
    steps = await _getDaysSteps(token, userId, activityDate);
    await new Promise(r => setTimeout(r, 5000));
    if(steps <= 8000){
      let missingSteps = 9000 - steps;
      let mileSteps = 1000;
      let miles = (missingSteps - (missingSteps%mileSteps))/mileSteps;
      await _logDaysWalk(token, activityDate, miles);
    }
  })
  
}

const _getDaysSteps = async (token: string, userId: string, activityDate: string) => {
  const getActivityURL = "https://api.fitbit.com/1/user/" + userId + "/activities/date/" + activityDate + ".json";
  const response = await rp({
    method: 'GET',
    url: getActivityURL,
    headers: {
      "Authorization": "Bearer " + token,
    },
    simple: true, // rejects non-200 status codes
  });
  let stepsFound: number;
  const { summary } = JSON.parse(response)
  stepsFound = summary.steps;
  console.log(activityDate + ' steps you walked ' + stepsFound)
  return stepsFound;
}

const _logDaysWalk = async (token: string, activityDate: string, miles: number) => {
  const activityLogURL = "https://api.fitbit.com/1/user/-/activities.json?activityId=90013&startTime=12%3A20&durationMillis=1800000&date=" + activityDate + "&distance=" + miles;
  const response = await rp({
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

// Public Methods ------------------------------------------------------------->
module.exports.LogQuarterlyActivities = _logQuarterlyActivities;