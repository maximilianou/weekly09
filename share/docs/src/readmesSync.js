const fs = require('fs');
const path = require('path');

const files = [
  '../../../ang03/Makefile',
  '../../../ang03/app30/src/index.html',
];

function copyFile(source, destination) {
  const input = fs.createReadStream(source);
  const output = fs.createWriteStream(destination);
  return new Promise((resolve, reject) => {
    output.on('error', reject);
    input.on('error', reject);
    input.on('end', resolve);
    input.pipe(output);
  });
}

const promises = files.map((file) => {
  const source = file.path;
  const destination = path.join('/tmp', file.path);
  const filename = path.parse(file.path).base;
  // const destination = path.join('/tmp', filename);
  return copyFile(source, destination);
});

Promise.all(promises).then((_) => {
  // do what you want
  console.log('done');
}).catch((err) => {
  // handle I/O error
  console.error(err);
});
