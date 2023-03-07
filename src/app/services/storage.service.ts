import { Injectable } from '@angular/core';
import {
  Storage,
  ref as ref_storage,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async uploadToFirestore(
    file: any,
    path: string,
    storage: Storage
  ): Promise<string> {
    var url = '';
    const storageRef = ref_storage(storage, path + file.name);
    var url = await getDownloadURL(storageRef);
    if (url != '') {
      const newFilePath = ref_storage(
        storage,
        path + file.name + Math.random().toString(36).substring(2)
      );
      const uploadTask = uploadBytesResumable(newFilePath, file);
      // monitor the upload progress
      uploadTask.on('state_changed', (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      });
      // get the download URL once the upload is complete
      const snapshot = await uploadTask;
      var downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } else {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      });
      const snapshot = await uploadTask;
      var downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
      // .then((snapshot) => {
      //   // Return the download URL
      //   const url = getDownloadURL(snapshot.ref);
      //   return url;
      // });
      // return url;
    }
  }
}
