import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initFlowbite } from 'flowbite';

bootstrapApplication(AppComponent, appConfig)
  .then(() => initFlowbite())