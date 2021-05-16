import * as authentication from '@feathersjs/authentication'
import limitToUser from '../../hooks/limit-to-user'
import { Hook, HookContext } from '@feathersjs/feathers'
import { ModelNames } from '../../misc/enums'
import autofillUserByToken from '../../hooks/autofill-user-by-token'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { shallowPopulate } = require('feathers-shallow-populate')
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks

const opts = {
  include: [
    {
      service: 'asset',
      nameAs: 'assets',
      keyHere: 'assets',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
    {
      service: 'asset-request',
      nameAs: 'requests',
      keyHere: 'requests',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
  ]
}


export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [autofillUserByToken({ fieldName: 'ownerId' })],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [shallowPopulate(opts)],
    find: [],
    get: [],
    create: [],
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
}
