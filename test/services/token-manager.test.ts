import app from '../../src/app';

describe('\'token-manager\' service', () => {
  it('registered the service', () => {
    const service = app.service('token-manager');
    expect(service).toBeTruthy();
  });
});
