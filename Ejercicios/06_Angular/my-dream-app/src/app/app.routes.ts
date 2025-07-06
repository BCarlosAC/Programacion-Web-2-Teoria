import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { About } from './about/about';
import { HelloWorldComponent } from './hello-world/hello-world';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'about', component: About },
  { path: 'hello', component: HelloWorldComponent }
];