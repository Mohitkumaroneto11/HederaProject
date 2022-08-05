const  fs =  require('fs');
const logger = require ("log4js");
require('dotenv').config()

exports.setupLogger = async ()=> {
   // console.log(process.env)
  const LOG_DIR = process.env.LOG_DIR || "logs/"
  logger.configure({
    appenders: {
      everything: {
        type: 'multiFile', base: LOG_DIR, property: 'gameId', extension: '.log',
        maxLogSize: 10485760, backups: 3, compress: true
      }
    },
    categories: {
      default: { appenders: ['everything'], level: process.env.LOG_LEVEL }
    }
  });
}


exports.gameLog = (gameId, ...args) => {
  const userLogger = logger.getLogger('game');
  userLogger.addContext('gameId', gameId);
  const logs = args.map((val)=>{
    let log = JSON.stringify(val);
    return log == '{}' ? val : log
  })
  userLogger.info('', ...logs);
}
