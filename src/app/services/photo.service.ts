import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  win: any = window;
  photo: String; // call in photos.page.html

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    // saveToPhotoAlbum: true
  }

  constructor(private camera: Camera, private file: File) { }

  /*
  * takePhoto
  * param:  null
  * return: void
  * usage:  take photo and call saveImage()
  * call:   photos.page.ts
  */
  public takePhoto()  {
    this.camera.getPicture(this.options).then((imagePath) => {
      this.saveImage(imagePath);
     }, (err) => {
      // Handle error
     });
  }

  /*
  * saveImage
  * param:  {String} tempImagePath
  * return: void
  * usage:  copy image from cache file to display
  * call:   this
  */
  async saveImage(tempImagePath: String) {
    const tempFileName = tempImagePath.substr(tempImagePath.lastIndexOf('/') + 1);
    const tempBaseFileSystemPath = tempImagePath.substr(0, tempImagePath.lastIndexOf('/') + 1);
    const newBaseFileSystemPath = this.file.dataDirectory;
    
    await this.file.copyFile(tempBaseFileSystemPath, tempFileName, 
      newBaseFileSystemPath, tempFileName);

    const storedPhoto = newBaseFileSystemPath + tempFileName;
    const displayImage = this.win.Ionic.WebView.convertFileSrc(storedPhoto);
    
    //Display in photos.page.html
    this.photo = displayImage;
  }
}
