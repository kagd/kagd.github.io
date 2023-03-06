import { createDrivers } from "./drivers";

export function createLap(overrides: Partial<Results.Lap> = {}): Results.Lap{
    const drivers = createDrivers();
    
    return {
        "carId": drivers.grant.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 100000,
        "splits": [
          20000,
          45000,
          35000
        ],
        ...overrides,
    };
}