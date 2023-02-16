import * as path from 'path';
import { consolidateResults } from './consolidateResults';
import { getDrivers } from './drivers';
import { setLapPositions } from './laps';

const seasonDir = path.join(__dirname, 'data', 'season6', 'results');

const trackList = consolidateResults(seasonDir);

const drivers = getDrivers(trackList['barcelona'].race.sessionResult.leaderBoardLines);

const driversWithLaps = setLapPositions(trackList['barcelona'].race.laps, drivers);
const driver = driversWithLaps.find((driver) => driver.lastName === 'Yee') as Processing.Driver;

console.log(driver.laps.map(lap => [lap.carPosition, lap.number]))