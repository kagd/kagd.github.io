export function createParticipantsFromRaceResults(raceResultsFile: Results.ResultFile): Processing.Participants {
    return raceResultsFile.sessionResult.leaderBoardLines.reduce(function(memo, line, idx){
        memo[line.car.carId] = {
            carId: line.car.carId,
            carModel: line.car.carModel,
            ...line.currentDriver,
            laps: [],
            qualified: 0,
            finished: idx + 1,
        };
        return memo;
    }, {} as { [carId: number]: Processing.Participant });
}

export function addQualifyingToRaceParticipants(particpants: Processing.Participants, qualifyingResultsFile: Results.ResultFile): Processing.Participants {
    return Object.keys(particpants).reduce(function(memo, carId){
        const carIdNumber = parseInt(carId, 10);
        const line = qualifyingResultsFile.sessionResult.leaderBoardLines.findIndex(function(line){
            return line.car.carId === carIdNumber;
        });

        const participant = particpants[carIdNumber];
        memo[carIdNumber] = {
            ...participant,
            qualified: line + 1
        }

        return memo;
    }, {} as Processing.Participants);
}

export function toList(particpants: Processing.Participants){
    return Object.keys(particpants).map(function(carId){
        return particpants[parseInt(carId)];
    })
}

export function sortByFinish(a: Processing.Participant, b: Processing.Participant){
    return a.finished > b.finished ? 1 : -1;
}