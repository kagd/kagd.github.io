const { readJSON } = require('./readJson');
const { authenticatatedGet } = require('./api');
const path = require('path');

const configPath = path.join(__dirname, '../', 'config.json');

function intervalsByHours(memo, interval, i){
  if(i % 4 === 0){
    memo.push(interval.wh_del);
  }
  else {
    memo[memo.length - 1] = memo[memo.length - 1] + interval.wh_del;
  }

  return memo;
}

function sum(memo, number){
  return memo + number;
}

function getSuffixFromIndex(index){
  return (index <= 11 || index === 23) ? 'am' : 'pm';
}

function toHoursObj(memo, number, idx){
  let start = idx;
  if(idx === 0){
    start = 12;
  }
  if(start > 12){
    start = idx - 12;
  }
  let end = idx + 1;
  if(end > 12){
    end = idx + 1 - 12;
  }
  const timespan = `${start}${getSuffixFromIndex(idx)} - ${end}${getSuffixFromIndex(idx + 1)}`;
  memo.push({
    timespan,
    kWh: number,
  });
  return memo;
}

(async function(){
  const config = readJSON(configPath);

  const data = await authenticatatedGet(config.urls.rgmStats);

  const hourIntervals = data.intervals.reduce(intervalsByHours, []);

  console.log(hourIntervals.reduce(toHoursObj, []));
  console.log(hourIntervals.reduce(sum, 0));
})();