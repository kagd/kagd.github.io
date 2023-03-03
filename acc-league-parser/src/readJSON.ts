import * as fs from 'fs';

export function readJSON<T>(filepath: string){
  if(!fs.existsSync(filepath)){
    throw 'not found';
  }

  const encodings: BufferEncoding[] = ['utf8', 'utf-8', 'utf16le'];

  const json = encodings.reduce(function(memo: null | T, encoding){
    if(memo){
        return memo;
    }
    try {
        // Kunos server files are in this format
        const contents = fs.readFileSync(filepath, encoding);
        return JSON.parse(contents) as T;
    } catch (error) {
        
    }
    return memo;
  }, null);

  if(!json){
    throw new Error('JSON parsing failed')
  }

  return json;
}
