export function createParticipantsFromRaceResults(raceResultsFile: Results.ResultFile): Processing.Participants {
    return raceResultsFile.sessionResult.leaderBoardLines.reduce(function(memo, line){
        memo[line.car.carId] = {
            carId: line.car.carId,
            carModel: line.car.carModel,
            ...line.currentDriver,
            laps: [],
            qualified: 0,
            finished: 0,
        };
        return memo;
    }, {} as { [carId: number]: Processing.Participant });
}

export function addQualifyingToRaceParticipants(particpants: Processing.Participants, qualifyingResultsFile: Results.ResultFile): Processing.Participants{
    return Object.keys(particpants).reduce(function(memo, carId){
        const carIdNumber = parseInt(carId, 10);
        const line = qualifyingResultsFile.sessionResult.leaderBoardLines.findIndex(function(line){
            return line.car.carId === carIdNumber;
        });

        const participant = particpants[carIdNumber];
        memo[carIdNumber] = {
            ...participant,
            finished: participant.laps[participant.laps.length - 1].position,
            qualified: line + 1
        }

        return memo;
    }, {} as Processing.Participants);
}