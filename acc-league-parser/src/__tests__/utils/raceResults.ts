import { createDrivers } from "./drivers";

export function createResults(overrides: Partial<Results.ResultFile> = {}): Results.ResultFile {
  const drivers = createDrivers();

  return {
    "laps": [
      // lap 1
      {
        "carId": drivers.yee.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 100000,
        "splits": [
          20000,
          45000,
          35000
        ]
      },
      {
        "carId": drivers.grant.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 102000,
        "splits": [
          21000,
          46000,
          35000
        ]
      },

      // lap 2
      {
        "carId": drivers.yee.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 90000,
        "splits": [
          17000,
          40000,
          33000
        ]
      },
      {
        "carId": drivers.grant.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 92000,
        "splits": [
          18000,
          40000,
          34000
        ]
      },
    ],
    "penalties": [],
    "sessionIndex": 2,
    "sessionResult": {
      "bestSplits": [
        29485,
        39830,
        34307
      ],
      "bestlap": 103802,
      "isWetSession": 0,
      "leaderBoardLines": [
        drivers.yee,
        drivers.grant
      ]
    },
    "sessionType": "R",
    "trackName": "barcelona",
    "metaData": "championship:8e9db8cd-268b-4c73-b20f-ff525e0d8bbb:38dc3f7f-a42b-4881-8722-4f11cdc8fac1",
    "Date": "2023-02-08T03:49:46Z",
    "SessionFile": "230208_034946_R",
    ...overrides
  };
};