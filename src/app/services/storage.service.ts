import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  child,
  Database,
  onValue,
  ref as ref_data,
} from '@angular/fire/database';
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
  constructor(private router: Router) {}

  async uploadToFirestore(
    file: any,
    path: string,
    storage: Storage,
  ): Promise<string> {
    var url = '';
    var tempName = ''
    var storageRef = ref_storage(storage, path + file.name);

    try {
      var url = await getDownloadURL(storageRef);
    } catch (err) {
      url = '';
    }
    console.log(url);

    while (url != '' || url == undefined) {
      try {
        tempName = Math.random().toString(36).substring(2);
        storageRef = ref_storage(
          storage,
          path + tempName + file.name
        );
        var url = await getDownloadURL(storageRef);
      } catch (err) {
        break;
      }
    }
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    });
    const snapshot = await uploadTask;
    var downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL + ',' + tempName;
  }

  // Creates a unique id to store the user in the database
  // Will mostly be used for job postings, as the users' id will be created by the authentication
  // EXAMPLE OF HOW TO USE THIS FUNCTION
  // var id = await this.storageService.IDgenerator('job-postings/', this.database);
  async IDgenerator(path: string, database: Database) {
    var id = '';
    var isGood = false;
    var data: never[] | null | undefined = [];
    const dbRef = ref_data(database);
    while (!isGood) {
      try {
        id = Math.random().toString(36).substring(2);
        var databaseRef = child(dbRef, path + id);
        onValue(databaseRef, (snapshot) => {
          data = snapshot.val();
        });
        if (data == null || data == undefined || data.length == 0) {
          isGood = true;
        }
      } catch (err) {
        break;
      }
    }

    return id;
  }
}
