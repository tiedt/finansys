import { BaseResourceModel } from 'src/app/shared/base-resource.model';
import { setupTestingRouter } from '@angular/router/testing';

export class Category extends BaseResourceModel {
   constructor( public id: number,
    public name: string,
    public description: string,
   )
   {
       super();
   }
}
