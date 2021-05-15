// shops-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose, Schema } from 'mongoose'
import {
  AssetRequestStatus,
  ModelNames, payloadSchema,
  PayloadStatus,
  TransactionRequestStatus,
  TransactionStatus,
} from '../misc/enums';
import {
  NUMBER,
  OBJECT_ID,
  REQUIRED_NUMBER,
  REQUIRED_OBJECT_ID,
  REQUIRED_STRING,
  STRING,
} from '../misc/mongoose-helpers'

export default function (app: Application): Model<any> {
  const modelName = ModelNames.TransactionRequest
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const schema = new Schema(
    {
      payload: payloadSchema,
      state: {
        ...REQUIRED_STRING,
        enum: Object.values(TransactionStatus),
        default: TransactionStatus.Processing,
      },
      relyTo: {
        ...REQUIRED_OBJECT_ID,
        ref: ModelNames.TransactionRequest,
      },
      originWallet: {
        ...REQUIRED_OBJECT_ID,
        ref: ModelNames.Wallet,
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
