import { consolidateResults } from '../consolidateResults';
import * as fs from 'fs';
import { createResults } from './utils/raceResults';
import * as readJSONModule from '../readJSON';

describe('ConsolidateResults', () => {
    beforeEach(function(){
        jest.resetAllMocks();
    });

    it('should combine race an qually results by race', () => {
        const barcaRace = createResults({sessionType: 'R'});
        const barcaQual = createResults({sessionType: 'Q'});
        const kyalamiQual = createResults({sessionType: 'Q', trackName: 'kyalami'});
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['race.json','qual.json','qual.json'] as any);
        jest.spyOn(readJSONModule, 'readJSON')
            .mockReturnValueOnce(barcaRace)
            .mockReturnValueOnce(barcaQual)
            .mockReturnValueOnce(kyalamiQual);

        const value = consolidateResults("./results");
        expect(value).toEqual({
            barcelona: {
                qualifying: barcaQual,
                race: barcaRace
            },
            kyalami: {
                qualifying: kyalamiQual
            }
        });
    });

    it('should ignore files that do NOT end in .json', () => {
        const barcaRace = createResults({sessionType: 'R'});
        const barcaQual = createResults({sessionType: 'Q'});
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['race.json','qual.json','.dsstore'] as any);
        const readJSONSpy = jest.spyOn(readJSONModule, 'readJSON')
            .mockReturnValueOnce(barcaRace)
            .mockReturnValueOnce(barcaQual);

        consolidateResults("./results");
        expect(readJSONSpy).toHaveBeenCalledTimes(2);
        expect(readJSONSpy).toBeCalledWith('results/race.json');
        expect(readJSONSpy).toBeCalledWith('results/qual.json');
        expect(readJSONSpy).not.toBeCalledWith('results/.dsstore');
    });
});
