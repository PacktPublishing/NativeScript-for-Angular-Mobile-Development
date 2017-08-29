import { File } from 'tns-core-modules/file-system';

export function deleteFile(path: string) {
  return new Promise((resolve, reject) => {
    let file = File.fromPath(path);
    try {
      file.remove().then((result) => {
        console.log('Removed older recording file:', result);
        resolve(result);
      }, (err) => {
        console.log('Error removing older recording:', err);
        reject(err);
      })
    } catch (err) {
      console.log('Could not remove older recording:', err);
      reject(err);
    }
  });
}