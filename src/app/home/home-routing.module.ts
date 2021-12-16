import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'video',
        loadChildren: () => import('./../tab/video/video.module').then( m => m.VideoPageModule)
      },
      {
        path: 'photos',
        loadChildren: () => import('./../tab/photos/photos.module').then( m => m.PhotosPageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./../tab/setting/setting.module').then( m => m.SettingPageModule)
      },
      {
        path: '',
        redirectTo: 'photos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
