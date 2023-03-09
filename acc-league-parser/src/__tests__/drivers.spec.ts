import { getDrivers } from '../drivers';
import { createResults } from './utils/raceResults';

describe('getDrivers', () => {
  it('returns a driver for each leaderBoardLine', () => {
    const results = createResults();
    const value = getDrivers(results.sessionResult.leaderBoardLines);
    expect(value).toContainEqual({
      firstName: "Ryan",
      lastName: "Yee",
      playerId: "S76561198141369186",
      shortName: "TDA",
      carId: 1002,
      laps: [],
    });

    expect(value).toContainEqual({
      firstName: "Grant",
      lastName: "Klinsing",
      playerId: "S76561197995236815",
      shortName: "KLI",
      carId: 1046,
      laps: [],
    });
  });
});
