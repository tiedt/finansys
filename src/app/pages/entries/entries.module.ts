import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EntriesRoutingModule,
  ]
})
export class EntriesModule { }
