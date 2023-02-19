import { deepClone } from "./utils";

export function addLapDetailsFromRace(raceResultsFile: Results.ResultFile, participants: Processing.Participants): Processing.Participants {
    const participantsCopy = deepClone(participants);

    const lapNumberCounter: number[] = [];
    const lapPositionCounter: number[] = [];
    const allFirstSectorsExclFirstLap: number[] = [];

    raceResultsFile.laps.forEach(function(lapData, idx){
        if(!lapData.carId || !participantsCopy[lapData.carId]){
            return;
        }
        
        let lapNumber: number;
        
        if(!lapNumberCounter[lapData.carId]){
            lapNumber = lapNumberCounter[lapData.carId] = 1;
        } else {
            lapNumber = ++lapNumberCounter[lapData.carId];
        }

        if(lapNumber > 1){
            allFirstSectorsExclFirstLap.push(lapData.splits[0]);
        }
        
        let lapPosition: number;
        
        if(!lapPositionCounter[lapNumber]){
            lapPosition = lapPositionCounter[lapNumber] = 1;
        } else {
            lapPosition = ++lapPositionCounter[lapNumber];
        }

        participantsCopy[lapData.carId].laps.push({
            ...lapData,
            number: lapNumber,
            position: lapPosition,
        });
    });

    correctFirstLapFirstSector(participantsCopy, allFirstSectorsExclFirstLap);

    return participantsCopy;
}

/**
 * Data fixing of laps for race sessions
 *
 * The  timer starts when the player enters the session or presses drive.
 * So we cannot trust sector 1 times or total times.
 */
function correctFirstLapFirstSector(participants: Processing.Participants, allFirstSectorsExclFirstLap: number[]) {
    const totalFirstSectorTime = allFirstSectorsExclFirstLap.reduce(function(memo, sectorTime){
        return memo + sectorTime;
    }, 0);
    
    const avgFirstSectorTime = (totalFirstSectorTime / allFirstSectorsExclFirstLap.length);

    Object.keys(participants).forEach(function(carId){
        const participant = participants[parseInt(carId)];

        // + 5s to account for grid start
        let newSector1Time = ((avgFirstSectorTime + 5000) / 1000);
        newSector1Time += (participant.laps[0].position * 0.01);
        participant.laps[0].splits[0] = Math.round(newSector1Time * 1000);
        participant.laps[0].laptime = participant.laps[0].splits[0] + participant.laps[0].splits[1] + participant.laps[0].splits[2];
    });
}