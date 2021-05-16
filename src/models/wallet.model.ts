// shops-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose, Schema } from 'mongoose'
import { BaseCurrencies, ModelNames, UserRoles } from '../misc/enums'
import {
  NUMBER,
  OBJECT_ID,
  REQUIRED_OBJECT_ID,
  REQUIRED_STRING,
  STRING,
} from '../misc/mongoose-helpers'

export default function (app: Application): Model<any> {
  const modelName = ModelNames.Wallet
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const schema = new Schema(
    {
      ownerId: {
        ...REQUIRED_OBJECT_ID,
        ref: ModelNames.Users,
      },
      baseCurrency: {
        ...STRING,
        enum: Object.values(BaseCurrencies),
        default: BaseCurrencies.USD,
      },
      walletPass: STRING,
      label: STRING,
      cachedBalance: {
        ...NUMBER,
        default: 0,
      },
      requests: {
        type: [
          {
            ...OBJECT_ID,
            ref: ModelNames.AssetRequest,
          },
        ],
      },
      assets: {
        type: [
          {
            ...OBJECT_ID,
            ref: ModelNames.Asset,
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  )

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    ;(mongooseClient as any).deleteModel(modelName)
  }
  return mongooseClient.model<any>(modelName, schema)
}
