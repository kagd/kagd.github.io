export function createParticipantFromLeaderBoardLine(leaderboardLine: Results.LeaderBoardLine): Processing.Participant {
  return {
    ...leaderboardLine.currentDriver,
    carId: leaderboardLine.car.carId,
    carModel: leaderboardLine.car.carModel,
    qualified: 1,
    finished: 0,
    laps: [],
  };
}