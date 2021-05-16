import { Service, MongooseServiceOptions } from 'feathers-mongoose'
import { Application } from '../../declarations'
import createApplication from '@feathersjs/feathers'

export class Asset extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
  }

  create(
    data: Partial<any> | Partial<any>[],
    params?: createApplication.Params
  ): Promise<any[] | any> {

    return super.create(data, params)
  }
}
