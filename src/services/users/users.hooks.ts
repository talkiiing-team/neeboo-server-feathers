import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow } from 'feathers-hooks-common';
import checkAdmin from '../../hooks/check-admin';
import limitToUser from '../../hooks/limit-to-user';
import createFirstWallet from '../../hooks/create-first-wallet';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt'), limitToUser({ allowOthers: true })],
    create: [
      hashPassword('password'),
    ],
    update: [disallow()],
    patch: [authenticate('jwt'), limitToUser(), hashPassword('password')],
    remove: [authenticate('jwt'), checkAdmin()],
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [createFirstWallet()],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
