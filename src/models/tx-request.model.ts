// shops-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose, Schema } from 'mongoose'
import {
  AssetRequestStatus,
  ModelNames,
  payloadSchema,
  PayloadStatus,
  TransactionRequestStatus,
} from '../misc/enums'
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

  const conditionSchema = new Schema({
    initiator: payloadSchema,
    assignee: payloadSchema,
  })

  const walletSidesSchema = new Schema({
    initiator: {
      ...REQUIRED_OBJECT_ID,
      ref: ModelNames.Wallet,
    },
    assignee: {
      ...REQUIRED_OBJECT_ID,
      ref: ModelNames.Wallet,
    },
  })

  const schema = new Schema(
    {
      conditions: conditionSchema,
      wallets: walletSidesSchema,
      state: {
        ...REQUIRED_STRING,
        enum: Object.values(TransactionRequestStatus),
        default: TransactionRequestStatus.Waiting,
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
