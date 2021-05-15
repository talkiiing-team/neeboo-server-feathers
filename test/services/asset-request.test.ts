import app from '../../src/app';

describe('\'asset-request\' service', () => {
  it('registered the service', () => {
    const service = app.service('asset-request');
    expect(service).toBeTruthy();
  });
});
