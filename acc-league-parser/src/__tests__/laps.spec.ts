import { addLapDetailsFromRaceToParticipants } from '../laps';
import { createDrivers } from './utils/drivers';
import { createResults } from './utils/raceResults';
import { createParticipantFromLeaderBoardLine } from './utils/participants';
import { createLap } from './utils/laps';

describe('addLapDetailsFromRace', () => {
  it('should add lap number to each lap', () => {
    const drivers = createDrivers();
    const laps: Results.Lap[] = [
      // lap 1
      createLap({
        "carId": drivers.yee.car.carId,
      }),
      createLap({
        "carId": drivers.grant.car.carId,
      }),
  
      // lap 2
      createLap({
        "carId": drivers.yee.car.carId,
      }),
      createLap({
        "carId": drivers.grant.car.carId,
      }),
    ];
    const results = createResults({laps});
    const yeeCarId = results.sessionResult.leaderBoardLines[0].car.carId;
    const grantCarId = results.sessionResult.leaderBoardLines[1].car.carId;
    const participants = {
      [yeeCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[0]),
      [grantCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[1])
    };
    const participantsWithLapsAdded = addLapDetailsFromRaceToParticipants(results, participants)
    expect(participantsWithLapsAdded[yeeCarId].laps[0].number).toEqual(1);
    expect(participantsWithLapsAdded[yeeCarId].laps[1].number).toEqual(2);
    expect(participantsWithLapsAdded[grantCarId].laps[0].number).toEqual(1);
    expect(participantsWithLapsAdded[grantCarId].laps[1].number).toEqual(2);
  });

  it('should add positions to each lap', () => {
    const drivers = createDrivers();
    const laps: Results.Lap[] = [
      // lap 1
      createLap({
        "carId": drivers.yee.car.carId,
      }),
      createLap({
        "carId": drivers.grant.car.carId,
      }),
  
      // lap 2
      createLap({
        "carId": drivers.yee.car.carId,
      }),
      createLap({
        "carId": drivers.grant.car.carId,
      }),
    ];
    const results = createResults({laps});
    const yeeCarId = results.sessionResult.leaderBoardLines[0].car.carId;
    const grantCarId = results.sessionResult.leaderBoardLines[1].car.carId;
    const participants = {
      [yeeCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[0]),
      [grantCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[1])
    };
    const participantsWithLapsAdded = addLapDetailsFromRaceToParticipants(results, participants)
    expect(participantsWithLapsAdded[yeeCarId].laps[0].position).toEqual(1);
    expect(participantsWithLapsAdded[yeeCarId].laps[1].position).toEqual(1);
    expect(participantsWithLapsAdded[grantCarId].laps[0].position).toEqual(2);
    expect(participantsWithLapsAdded[grantCarId].laps[1].position).toEqual(2);
  });

  it('should account for positions changes each lap', () => {
    const drivers = createDrivers();
    const laps: Results.Lap[] = [
      // lap 1
      createLap({
        "carId": drivers.yee.car.carId,
      }),
      createLap({
        "carId": drivers.grant.car.carId,
      }),
  
      // lap 2
      createLap({
        "carId": drivers.grant.car.carId,
      }),
      createLap({
        "carId": drivers.yee.car.carId,
      }),
    ];
    const results = createResults({laps});
    const yeeCarId = results.sessionResult.leaderBoardLines[0].car.carId;
    const grantCarId = results.sessionResult.leaderBoardLines[1].car.carId;
    const participants = {
      [yeeCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[0]),
      [grantCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[1])
    };
    const participantsWithLapsAdded = addLapDetailsFromRaceToParticipants(results, participants)
    expect(participantsWithLapsAdded[yeeCarId].laps[0].position).toEqual(1);
    expect(participantsWithLapsAdded[yeeCarId].laps[1].position).toEqual(2);
    expect(participantsWithLapsAdded[grantCarId].laps[0].position).toEqual(2);
    expect(participantsWithLapsAdded[grantCarId].laps[1].position).toEqual(1);
  });

  it('should update first lap, first sector time by avg first sectors across all drivers, increased by postion, plus 5s', () => {
    const drivers = createDrivers();
    const laps: Results.Lap[] = [
      // lap 1
      createLap({
        carId: drivers.yee.car.carId,
      }),
      createLap({
        carId: drivers.grant.car.carId,
      }),
  
      // lap 2
      createLap({
        carId: drivers.grant.car.carId,
        splits: [
          1000,
          1000,
          1000
        ]
      }),
      createLap({
        carId: drivers.yee.car.carId,
        splits: [
          1200,
          1000,
          1000
        ]
      }),

      // lap 3
      createLap({
        carId: drivers.grant.car.carId,
        splits: [
          1000,
          1000,
          1000
        ]
      }),
      createLap({
        carId: drivers.yee.car.carId,
        splits: [
          1200,
          1000,
          1000
        ]
      }),
    ];
    const results = createResults({laps});
    const yeeCarId = results.sessionResult.leaderBoardLines[0].car.carId;
    const grantCarId = results.sessionResult.leaderBoardLines[1].car.carId;
    const participants = {
      [yeeCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[0]),
      [grantCarId]: createParticipantFromLeaderBoardLine(results.sessionResult.leaderBoardLines[1])
    };
    const participantsWithLapsAdded = addLapDetailsFromRaceToParticipants(results, participants);
    expect(participantsWithLapsAdded[yeeCarId].laps[0].splits[0]).toEqual(6110);
    expect(participantsWithLapsAdded[grantCarId].laps[0].splits[0]).toEqual(6120);
  });
});
