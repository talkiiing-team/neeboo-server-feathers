import app from '../../src/app';

describe('\'wallet\' service', () => {
  it('registered the service', () => {
    const service = app.service('wallet');
    expect(service).toBeTruthy();
  });
});
