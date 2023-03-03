import * as path from 'path';
import { consolidateResults } from './consolidateResults';
import { getDrivers } from './drivers';
import { addLapDetailsFromRace } from './laps';
import { createParticipantsFromRaceResults, addQualifyingToRaceParticipants, toList, sortByFinish } from "./participants";

const seasonDir = path.join(__dirname, 'data', 'season6', 'results');

const trackList = consolidateResults(seasonDir);

// const drivers = getDrivers(trackList['barcelona'].race.sessionResult.leaderBoardLines);

const participants = createParticipantsFromRaceResults(trackList['barcelona'].race);

const results = addQualifyingToRaceParticipants(addLapDetailsFromRace(trackList['barcelona'].race, participants), trackList['barcelona'].qualifying);

// const driver = drivers.find((driver) => driver.lastName === 'Koptsov') as Processing.Driver;

// console.log(results[driver.carId].laps);

toList(results).sort(sortByFinish).forEach(function(participant){
    console.log(participant.finished, participant.lastName);
})
// toList(results).sort(sortByFinish).forEach(function(result){
//     console.log(result.laps.length)
// })