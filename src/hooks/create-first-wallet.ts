// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'
import { ModelNames } from '../misc/enums'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { _id } = context.result
    await context.app.service(ModelNames.Wallet).create({
      ownerId: _id,
      label: 'NeeWallet Standard',
    })
    return context
  }
}
