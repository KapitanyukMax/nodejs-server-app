const fs = require('fs');
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fs.promises.mkdir(path.join(__dirname, 'logs'));
        }
        await fs.promises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;
