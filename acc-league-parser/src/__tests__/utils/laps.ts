import { createDrivers } from "./drivers";

export function createLap(){
    const drivers = createDrivers();
    
    return {
        "carId": drivers.yee.car.carId,
        "driverIndex": 0,
        "isValidForBest": true,
        "laptime": 100000,
        "splits": [
          20000,
          45000,
          35000
        ]
    };
}