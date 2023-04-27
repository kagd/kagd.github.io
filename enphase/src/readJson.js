const fs = require('fs');

function readJSON(filepath){
  if(!fs.existsSync(filepath)){
    throw 'not found';
  }

  const encodings = ['utf8', 'utf-8', 'utf16le'];
  let json = null;

  for(let i = 0; i < encodings.length; i++){
    const encoding = encodings[i];
    try {
      const contents = fs.readFileSync(filepath, encoding);
      json = JSON.parse(contents);
      break;
    } catch (error) {
        
    }
  }

  if(!json){
    throw new Error('JSON parsing failed');
  }

  return json;
}

module.exports = {
  readJSON,
}