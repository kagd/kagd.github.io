export function setLapPositions(laps: Results.Lap[], drivers: Processing.Driver[]): Processing.Driver[] {
    let maxLapCount = 0;

    const driversWithLaps = drivers.map(function(driver){
        const driverLaps = getDriverLaps(laps, driver);

        let elapsedTime = 0;

        const fixedLaps = driverLaps.map<Processing.Lap>(function(lap, index){
            const lapNumber = index + 1;
            if(lapNumber > maxLapCount){
                maxLapCount = lapNumber;
            }

            return {
                ...lap,
                elapsedTime: lap.laptime + elapsedTime,
                number: lapNumber,
                carPosition: 0
            }
        });

        return {
            ...driver,
            laps: fixedLaps,
        } as Processing.Driver
    });

    // Group laps by lap number and sort by elapsed time to find position
    const lapsByNumber = Array.from(new Array(maxLapCount)).map(function(_, idx){
        // https://github.com/mauserrifle/simresults/blob/f714438cf40f666a5d1ca518c5986c271ad72556/lib/Simresults/Data/Reader.php#L373
        const lapsByNumber = getLapsByLapNumberSortedByTime(idx + 1, driversWithLaps);
        const lapsByNumberSorted = sortLapsByElapsedTime(lapsByNumber);

        lapsByNumberSorted.forEach(function(lap, index){
            if(lap.laptime && lap.elapsedTime){
                lap.carPosition = index + 1;
            }
        });

        return lapsByNumberSorted;
    });

    return driversWithLaps.reduce(function(memo, driverWithLap){
        
        const driverLaps = lapsByNumber.map(function(laps){
            const lap = laps.find(function(lap){
                return lap.carId === driverWithLap.carId;
            }) as Processing.Lap;

            return lap;
        });
        memo.push({
            ...driverWithLap,
            laps: driverLaps
        })

        return memo;
    }, [] as Processing.Driver[]);
}

export function driverPositionPerLap(laps: Results.Lap[], driver: Processing.Driver){
    
}

function getDriverLaps(laps: Results.Lap[], driver: Processing.Driver){
    return laps.filter(function(lap){
        return lap.carId === driver.carId;
    });
}

function getLapsByLapNumberSortedByTime(lapNumber: number, driverWithLaps: Processing.Driver[]){
    const lapsByNumber = driverWithLaps.reduce(function(memo, driverWithLap){
        const driverLap = driverWithLap.laps.find(function(lap){
            return lap.number === lapNumber;
        });

        if(driverLap){
            memo.push(driverLap);
        }

        return memo;
    }, [] as Processing.Lap[]);

    return sortLapsByTime(lapsByNumber);
}

function sortLapsByTime(laps: Processing.Lap[]){
    return laps.sort(function(a, b){
        if(a.laptime === b.laptime){
            return 0;
        }

        if(a.laptime === null){
            return 1;
        }

        if(b.laptime === null){
            return -1;
        }

        return a.laptime > b.laptime ? -1 : 1;
    });
}

function sortLapsByElapsedTime(laps: Processing.Lap[]){
    return laps.sort(function(a, b){
        if(a.elapsedTime === b.elapsedTime){
            return 0;
        }

        if(a.elapsedTime === null){
            return 1;
        }

        if(b.elapsedTime === null){
            return -1;
        }

        if(a.laptime === null){
            return 1;
        }

        if(b.laptime === null){
            return -1;
        }

        return a.elapsedTime > b.elapsedTime ? -1 : 1;
    });
}