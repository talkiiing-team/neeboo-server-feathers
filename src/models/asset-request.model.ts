// shops-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose } from 'mongoose'
import { AssetRequestStatus, ModelNames } from '../misc/enums'
import {
  REQUIRED_NUMBER,
  REQUIRED_STRING,
  STRING,
} from '../misc/mongoose-helpers'

export default function (app: Application): Model<any> {
  const modelName = ModelNames.AssetRequest
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const schema = new Schema(
    {
      price: REQUIRED_NUMBER,
      name: REQUIRED_STRING,
      label: STRING,
      subject: REQUIRED_STRING,
      state: {
        ...REQUIRED_STRING,
        enum: Object.values(AssetRequestStatus),
        default: AssetRequestStatus.Queued,
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
