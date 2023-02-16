namespace Results {
    declare type LeaderBoardLine = {
        car: {
            carId: number;
            carModel: number;
            cupCategory: number;
            drivers: Driver[];
            nationality: number;
            raceNumber: number;
            teamName: string;
        };
        currentDriver: Driver;
        currentDriverIndex: number;
        driverTotalTimes: number[];
        missingMandatoryPitstop: number;
        timing: Timing;
    }

    declare type SessionResult = {
        bestSplits: number[];
        bestlap: number;
        isWetSession: number;
        leaderBoardLines: LeaderBoardLine[];
    }

    declare type Driver = {
        firstName: string;
        lastName: string;
        playerId: string;
        shortName: string;
    }

    declare type Timing = {
        bestLap: number;
        bestSplits: number[];
        lapCount: number;
        lastLap: number;
        lastSplitId: number;
        lastSplits: number[];
        totalTime: number;
    }

    declare type Lap = {
        carId: number;
        driverIndex: 0;
        isValidForBest: boolean;
        laptime: number;
        /**
         * @description Sector split times
         */
        splits: number[];
    }

    declare type Penalty = {
        carId: number;
        clearedInLap: number;
        driverIndex: number;
        penalty: string;
        penaltyValue: number;
        reason: string;
        vialoationInLap: number;
    }

    declare type ResultFile = {
        laps: Lap[];
        penalties: Penalty[];
        sessionIndex: number;
        sessionResult: SessionResult;
        sessionType: 'R' | 'Q';
        trackName: string;
        metaData: string;
        Date: string;
        SessionFile: string;
    }
}

namespace Processing {
    declare type TrackList = {
        [trackname: string]: {
            qualifying: Results.ResultFile;
            race: Results.ResultFile;
        }
    }

    declare type Driver = Results.Driver & {
        carId: number;
        laps: Lap[];
    }

    declare type Lap = Results.Lap & {
        number: number;
        carPosition: number;
        elapsedTime: number;
    }
}