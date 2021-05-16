// Initializes the `token-manager` service on path `/token-manager`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TokenManager } from './token-manager.class';
import hooks from './token-manager.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'token-manager': TokenManager & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/token-manager', new TokenManager(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('token-manager');

  service.hooks(hooks);
}
