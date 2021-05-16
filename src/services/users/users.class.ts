import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { Application } from '../../declarations';
import createApplication, { Paginated } from '@feathersjs/feathers';
import {BadRequest} from '@feathersjs/errors';
// import createApplication from '@feathersjs/feathers';
// import { UserRoles } from '../../misc/enums';
// import { Forbidden } from '@feathersjs/errors';

export class Users extends Service {
  app: Application;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  create(data: Partial<any> | Partial<any>[], params?: createApplication.Params): Promise<any[] | any> {
    if (Array.isArray(data)) {
      throw new BadRequest('Cannot create multiple users batch', {})
    }

    if (!data.displayName) {
      data.displayName = data.email.split('@')[0]
    }

    return super.create(data, params);
  }
}
