import app from '../../src/app';

describe('\'asset\' service', () => {
  it('registered the service', () => {
    const service = app.service('asset');
    expect(service).toBeTruthy();
  });
});
