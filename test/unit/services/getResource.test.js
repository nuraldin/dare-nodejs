import chai from 'chai';
import chaiSpies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';

import getResource from '../../../src/services/insurance_api/request/getResource.js';
import axios from 'axios';
import services from '../../../src/services/index.js';

chai.use(chaiSpies);
chai.use(chaiAsPromised);

const assert = chai.assert;
const expect = chai.expect;

describe('getResource.js', () => {
  describe('services.auth.getToken failure', () => {
    beforeEach(() => {
      chai.spy.on(services.auth, 'getToken', () => {
        return Promise.reject(new Error('rejected'));
      });
    });

    it('should be rejected', async () => {
      expect( getResource(null, null, null)).to.be.rejected;
    });

    afterEach(() => {
      chai.spy.restore(services);
    });
  });

  describe('services.auth.getToken failure', () => {
    beforeEach(() => {
      chai.spy.on(services.auth, 'getToken', () => {
        return Promise.resolve('accessToken');
      });
      chai.spy.on(axios, 'get', () => {
        return Promise.reject(new Error(`get failed`));
      });
    });

    it('should be rejected', async () => {
      expect( getResource('endpoint', null, null) ).to.be.rejected;
    });

    afterEach(() => {
      chai.spy.restore(services);
    });
  });
});