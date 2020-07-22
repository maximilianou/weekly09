const fs = require('fs').promises;

const copy = async (cmd) => {
  try {
    const data = await fs.readFile(cmd.fileIn);
    await fs.writeFile(cmd.fileOut, data);
    await fs.appendFile(cmd.fileOut, '\n');
  } catch (error) {
    console.log(error);
  }
};
const append = async (cmd) => {
  try {
    const data = await fs.readFile(cmd.fileIn);
    await fs.appendFile(cmd.fileOut, cmd.mark);
    await fs.appendFile(cmd.fileOut, '\n');
    await fs.appendFile(cmd.fileOut, data);
    await fs.appendFile(cmd.fileOut, cmd.mark);
    await fs.appendFile(cmd.fileOut, '\n');
  } catch (error) {
    console.log(error);
  }
};
const readme = async () => {
  await copy({ fileIn: 'filein.txt', fileOut: 'fileout.txt' });
  await append({ fileIn: 'filein.txt', fileOut: 'fileout.txt', mark: '```' });
};

readme();
