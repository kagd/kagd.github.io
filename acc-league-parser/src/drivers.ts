export function getDrivers(leaderBoardLines: Results.LeaderBoardLine[]){
    return leaderBoardLines.reduce(function(memo, leaderBoardLine){
        memo.push({
            ...leaderBoardLine.currentDriver,
            carId: leaderBoardLine.car.carId,
            laps: []
        });
        return memo;
    }, [] as Processing.Driver[]);
}