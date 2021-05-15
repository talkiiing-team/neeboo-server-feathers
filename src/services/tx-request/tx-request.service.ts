// Initializes the `tx-request` service on path `/tx-request`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TxRequest } from './tx-request.class';
import createModel from '../../models/tx-request.model';
import hooks from './tx-request.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tx-request': TxRequest & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tx-request', new TxRequest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tx-request');

  service.hooks(hooks);
}
