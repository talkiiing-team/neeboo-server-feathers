import { Service, MongooseServiceOptions } from 'feathers-mongoose'
import { Application } from '../../declarations'
import createApplication from '@feathersjs/feathers'
import { BadRequest } from '@feathersjs/errors'
import { AssetRequestStatus } from '../../misc/enums'

export class AssetRequest extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  private app: Application
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async create(
    data: Partial<any>,
    params?: createApplication.Params
  ): Promise<any> {
    if (Array.isArray(data)) {
      throw new BadRequest('Cannot create multiple requests, try in one', {})
    }
    data.owner = {
      id: params?.user?._id,
      name: params?.user?.displayName || params?.user?.email.split('@')[0],
    }

    return super.create(data, params)
  }

  async patch(
    id: createApplication.NullableId,
    data: Partial<any>,
    params?: createApplication.Params
  ): Promise<any[] | any> {
    if (!id) throw new BadRequest('Not found "id" parameter', {})
    const oldRequest = await this.get(id)
    if (
      data.state &&
      data?.state !== oldRequest.state &&
      data?.state === AssetRequestStatus.Accepted
    ) {
      console.log('bc-logic')
      const { price, name, subject, owner } = oldRequest
      const nft = {
        price,
        name,
        subject,
      }
      const { hash } = await this.app
        .service('token-manager')
        .create({ asset: JSON.stringify(nft) })

      const newAsset = {
        price,
        name,
        token: hash,
        subject,
        creator: {
          name: owner.name,
          id: owner.id,
        },
      }
      /*
        price: REQUIRED_NUMBER,
          name: REQUIRED_STRING,
          token: REQUIRED_STRING,
          label: STRING,
          subject: REQUIRED_STRING,
          creator: creatorSchema,
          name: REQUIRED_STRING,
          id: {
        ...REQUIRED_OBJECT_ID,
            ref: ModelNames.Users,
        },
        */
      const { _id: assetId } = await this.app
        .service('asset')
        .create({ ...newAsset })

      await this.app.service('wallet').update(owner.id, {
        $push: { asset: assetId },
      })

      data.readyAsset = assetId
    }

    return super.patch(id, data, params)
  }
}
