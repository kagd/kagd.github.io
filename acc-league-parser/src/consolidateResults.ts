import * as fs from 'fs';
import * as path from 'path';
import { readJSON } from './readJSON';

export function consolidateResults(resultsDir: string): Processing.TrackList {
    return fs.readdirSync(resultsDir).reduce(function(memo, fileName){
        if(!fileName.endsWith('.json')){
            return memo;
        }
        
        const json = readJSON<Results.ResultFile>(path.join(resultsDir, fileName));
    
        if(!memo[json.trackName]){
            memo[json.trackName] = {} as any;
        }
        memo[json.trackName][json.sessionType === 'Q' ? 'qualifying' : 'race'] = json;
        
        return memo;
    }, {} as Processing.TrackList);
}