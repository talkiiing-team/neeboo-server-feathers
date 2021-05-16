// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = { fieldName: '_id' }): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (!context.data[options.fieldName]) {
      context.data[options.fieldName] = context.params.user?._id
    }

    return context
  }
}
