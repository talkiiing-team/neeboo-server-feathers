import app from '../../src/app';

describe('\'tx-request\' service', () => {
  it('registered the service', () => {
    const service = app.service('tx-request');
    expect(service).toBeTruthy();
  });
});
