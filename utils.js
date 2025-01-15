import fs from 'fs';

export function prependFile(filePath, textToPrepend) {
    const data = fs.readFileSync(filePath);
    const fd = fs.openSync(filePath, 'w+');
    const insert = Buffer.from(textToPrepend + "\n");
    fs.writeSync(fd, insert, 0, insert.length, 0);
    fs.writeSync(fd, data, 0, data.length, insert.length);
    fs.closeSync(fd);
}

export function fuzzyTime(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 5) {
      return 'just now';
    } else if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (minutes < 2) {
      return 'a minute';
    } else if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (hours < 2) {
      return 'an hour';
    } else if (hours < 24) {
      return `${hours} hours`;
    } else if (days < 2) {
      return 'a day';
    } else {
      return `${days} days`;
    }
}