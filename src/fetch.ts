import cliProgress from 'cli-progress';
import decompress from 'decompress';
import deleter from 'del';
import fs from 'fs';
import nodeFetch from 'node-fetch';
import request from 'request';
const fsPromises = fs.promises;

interface Version {
  version: string;
  updated: string;
}
const path = {
  latestDist: 'latest/dist',
  latestVersion: 'latest/version.json',
  tempDist: 'tmp/dist.zip',
  remoteVersion: 'http://storage.googleapis.com/fighter-html/version.json',
  remoteDist: (version: string) => `http://storage.googleapis.com/fighter-html/${version}.zip`,
};

const downloadDist = async (version: string) => {
  console.log('deleting old zip');
  await deleter(path.tempDist);

  console.log('downloading new zip:', version);
  const url = path.remoteDist(version);
  const filename = path.tempDist;
  await new Promise<void>((resolve, reject) => {
    const progressBar = new cliProgress.SingleBar({
      format: '{bar} {percentage}% | ETA: {eta}s'
    }, cliProgress.Presets.shades_classic);

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0

    request.get(url)
      .on('response', (response) => {
        if (response.statusCode !== 200) {
          return reject('Response status was ' + response.statusCode);
        }

        const totalBytes = parseFloat(response.headers['content-length']!);
        progressBar.start(totalBytes, 0);
      })
      .on('data', (chunk) => {
        receivedBytes += chunk.length;
        progressBar.update(receivedBytes);
      })
      .pipe(file)
      .on('error', (err) => {
        fsPromises.unlink(filename);
        progressBar.stop();
        return reject(err.message);
      });

    file.on('finish', () => {
      progressBar.stop();
      file.close();
      resolve();
    });

    file.on('error', (err) => {
      fsPromises.unlink(filename);
      progressBar.stop();
      return reject(err.message);
    });
  });
  console.log('finished download');
};

const unzipDist = async () => {
  console.log('deleting old folder');
  await deleter(path.latestDist);
  console.log('unzipping new folder, this may take a minute...');
  await decompress(path.tempDist, path.latestDist);
  console.log('deleting new zip');
  await deleter(path.tempDist);
}

const fetchVersion = async () => {
  let oldVersion: (Version | undefined);
  try {
    const oldVersionBuffer = await fsPromises.readFile(path.latestVersion);
    const oldVersionRaw = oldVersionBuffer.toString();
    oldVersion = JSON.parse(oldVersionRaw);
  } catch (e) {
    // do nothing
  }

  try {
    const versionRep = await nodeFetch(path.remoteVersion);
    const newVersionRaw = await versionRep.text();
    const newVersion: Version = JSON.parse(newVersionRaw);

    console.log(oldVersion, newVersion);
    if (!oldVersion || oldVersion.version !== newVersion.version) {
      await downloadDist(newVersion.version);
      await unzipDist();
    } else {
      console.log('already up to date');
    }

    console.log('updating version.json');
    await fsPromises.writeFile(path.latestVersion, newVersionRaw);
  } catch (error) {
    if (oldVersion === undefined) {
      console.log('no old version detected, throwing error:', error);
      throw error;
    } else {
      console.log('there was an error fetching new version:', error);
    }
  }
  console.log('done!');
};
fetchVersion();

// ts-lint
export { };
