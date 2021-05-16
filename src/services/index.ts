import { Application } from '../declarations'
import users from './users/users.service'
import asset from './asset/asset.service'
import assetRequest from './asset-request/asset-request.service'
import wallet from './wallet/wallet.service'
import txRequest from './tx-request/tx-request.service'
import transaction from './transaction/transaction.service'
import tokenManager from './token-manager/token-manager.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users)
  app.configure(asset)
  app.configure(assetRequest)
  app.configure(wallet)
  app.configure(txRequest)
  app.configure(transaction)
  app.configure(tokenManager);
}
