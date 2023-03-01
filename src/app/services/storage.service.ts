import { Injectable } from '@angular/core';
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

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
    const storageRef = ref_storage(storage, path + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // monitor the upload progress
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    });

    // get the download URL once the upload is complete
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File available at', downloadURL);
    return downloadURL;
  }


}
