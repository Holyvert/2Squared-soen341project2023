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
    var storageRef = ref_storage(storage, path + file.name);
    
    while(url != '' || url == undefined){
      var url = await getDownloadURL(storageRef);
      try{
        storageRef = ref_storage(
          storage,
          path + Math.random().toString(36).substring(2) + file.name
        );
        var url = await getDownloadURL(storageRef);
      }catch(err){
        break;
      }
    }
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      });
      const snapshot = await uploadTask;
      var downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
  
    }


}
