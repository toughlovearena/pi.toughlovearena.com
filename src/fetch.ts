import decompress from 'decompress';
import deleter from 'del';
import fs from 'fs';
import nodeFetch from 'node-fetch';
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
  console.log('downloading:', version);
  await deleter(path.tempDist);
  const latestResp = await nodeFetch(path.remoteDist(version));
  const stream = fs.createWriteStream(path.tempDist);
  await new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
    latestResp.body!.pipe(stream);
  });
  console.log('finished download');
};

const unzipDist = async () => {
  console.log('unzipping...');
  await deleter(path.latestDist);
  await decompress(path.tempDist, path.latestDist);
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
