import * as path from 'path';
import { consolidateResults } from './consolidateResults';
import { getDrivers } from './drivers';
import { addLapDetailsFromRace } from './laps';
import { createParticipantsFromRaceResults, addQualifyingToRaceParticipants } from "./participants";

const seasonDir = path.join(__dirname, 'data', 'season6', 'results');

const trackList = consolidateResults(seasonDir);

const drivers = getDrivers(trackList['barcelona'].race.sessionResult.leaderBoardLines);

const participants = createParticipantsFromRaceResults(trackList['barcelona'].race);

const results = addQualifyingToRaceParticipants(addLapDetailsFromRace(trackList['barcelona'].race, participants), trackList['barcelona'].qualifying);

const driver = drivers.find((driver) => driver.lastName === 'Klinsing') as Processing.Driver;

console.log(results[driver.carId].qualified, results[driver.carId].finished, results[driver.carId].laps[0]);

// console.log(driver.laps.map(lap => [lap.carPosition, lap.number]))