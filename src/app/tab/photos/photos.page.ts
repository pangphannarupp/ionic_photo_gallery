import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

  takePhoto() {
    this.photoService.takePhoto();
  }
}
