const { append, remove } = require('./readmes.js');

console.log('createing README.md');

const fileOut = '../../../README.md';
const fileIn = [
  '../../../ang03/Makefile',
  '../../../ang03/app30/src/index.html',
  '../../../ang03/app30/src/main.ts',
  '../../../ang03/app30/src/main.ts',
  '../../../ang03/app30/src/app/app.module.ts',
  '../../../ang03/app30/src/app/app.component.ts',
  '../../../ang03/app30/src/app/app.component.html',
  '../../../ang03/app30/src/app/app-routing.module.ts',
  '../../../ang03/app30/src/app/home/home.component.ts',
  '../../../ang03/app30/src/app/home/home.component.html',
];
const publish = () => {
  remove({ fileOut });
  console.log('removed.');
  fileIn.forEach((file) => {
    console.log('each file.');
    append({ fileIn: file, fileOut, mark: '\n```\n' });
  });
};

/*
const publish = async () => {
  await remove({ fileOut });
  await Promise.all(fileIn.map(async (file) => {
    await append({ fileIn: file, fileOut, mark: '```' });
  }));
};
*/
publish();

console.log('created README.md');
