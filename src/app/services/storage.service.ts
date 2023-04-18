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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async uploadToFirestore(
    file: any,
    path: string,
    storage: Storage
  ): Promise<string> {
    let url = '';
    let tempName = '';
    let storageRef = ref_storage(storage, path + file.name);

    try {
      let url = await getDownloadURL(storageRef);
    } catch (err) {
      url = '';
    }
    console.log(url);

    while (url != '' || url == undefined) {
      try {
        tempName = Math.random().toString(36).substring(2);
        storageRef = ref_storage(storage, path + tempName + file.name);
        let url = await getDownloadURL(storageRef);
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
    let downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL + ',' + tempName;
  }

  // Creates a unique id to store the postings in the database
  // Will mostly be used for job postings, as the users' id will be created by the authentication
  async IDgenerator(path: string, database: Database) {
    let id = '';
    let isGood = false;
    let data: never[] | null | undefined = [];
    const dbRef = ref_data(database);
    while (!isGood) {
      try {
        id = Math.random().toString(36).substring(2);
        let databaseRef = child(dbRef, path + id);
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
