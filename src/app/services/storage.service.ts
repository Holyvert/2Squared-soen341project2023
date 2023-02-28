import { Injectable } from '@angular/core';
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  uploadToFirestore(file: any, path: string, storage: Storage): string {
    var url!: string;
    const storageRef = ref_storage(storage, path + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) / 100;
      console.log('Upload is ' + progress + '% done');
    }
    )
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      url = downloadURL;
      console.log('File available at', url);
    });
    return url;
  }
}
