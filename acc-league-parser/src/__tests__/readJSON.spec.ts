import { readJSON } from '../readJSON';
import * as fs from 'fs';

describe('readJSON', () => {
  function setupExistsSync(value: boolean){
    jest.spyOn(fs,'existsSync').mockReturnValue(value);
  }

  function setupReadFileSyncForEncoding(encodingString: string){
    jest.spyOn(fs, 'readFileSync').mockImplementation(function(filepath, encoding){
      if(encoding === encodingString){
        return '{"foo": "bar"}';
      }
      return "abc";
    });
  }

  beforeEach(jest.resetAllMocks);

  it('should throw an error when file is NOT found', () => {
    setupExistsSync(false);
    try {
      readJSON('foo');
      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('will return file contents with utf8 encoding', () => {
    setupExistsSync(true);
    setupReadFileSyncForEncoding('utf8');
    const value = readJSON('foo');
    expect(value).toEqual({"foo":"bar"});
  });

  it('will return file contents with utf-8 encoding', () => {
    setupExistsSync(true);
    setupReadFileSyncForEncoding('utf-8');
    const value = readJSON('foo');
    expect(value).toEqual({"foo":"bar"});
  });

  it('will return file contents with utf16le encoding', () => {
    setupExistsSync(true);
    setupReadFileSyncForEncoding('utf16le');
    const value = readJSON('foo');
    expect(value).toEqual({"foo":"bar"});
  });

  it('should throw an error when file is not correctly decoded', () => {
    setupExistsSync(true);
    setupReadFileSyncForEncoding('ascii');
    try {
      const value = readJSON('foo');
      console.log({value})
      expect(true).toEqual(false);
    } catch (error) {
      expect(error?.toString()).toEqual('Error: JSON parsing failed');
    }
  });
});
