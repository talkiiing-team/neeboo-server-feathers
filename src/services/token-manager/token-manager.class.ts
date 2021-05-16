import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { BadRequest } from '@feathersjs/errors'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'
import Asset from './abis/Asset.json'
import Provider from '@truffle/hdwallet-provider'

interface Data {
  id?: Id
  asset?: string
  hash?: string
}

interface ServiceOptions {}

export class TokenManager implements ServiceMethods<Data> {
  app: Application
  options: ServiceOptions
  web3: Web3
  networkId: number | undefined
  myContract: Contract | undefined
  pk: string
  infuraUrl: string
  w3Address: string

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
    this.pk = app.get('web3-private')
    this.infuraUrl = app.get('web3-infura')
    this.w3Address = app.get('web3-address')
    console.log(this.pk, this.infuraUrl, this.w3Address)
    const provider = new Provider(this.pk, this.infuraUrl)
    this.web3 = new Web3(provider)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      asset: `A new message with ID: ${id}!`,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      throw new BadRequest('Cannot create multiple tokens', {})
    }
    if (!data.asset) {
      throw new BadRequest('No Token data provided, "asset" required', {})
    }

    this.networkId =  await this.web3.eth.net.getId()

    this.myContract = new this.web3.eth.Contract(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Asset.abi,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Asset.networks[this.networkId].address
    )

    console.log(typeof this.networkId, typeof this.myContract)

    if (!this.myContract) {
      console.log(this.myContract)
      throw new BadRequest('Too early, wait a moment', {
        contract: this.myContract,
      })
    }

    /*
    console.log(await this.myContract.methods.data().call())
    console.log(`Old data value: ${await this.myContract.methods.data().call()}`)
    */

    const receipt = await this.myContract.methods
      .mint(data.asset)
      .send({ from: this.w3Address })
    console.log(`Transaction hash: ${receipt.transactionHash}`)

    /*
    console.log(`New data value: ${await myContract.methods.data().call()}`)
    //.eth.defaultAccount = '0xWalletAddress'
    */

    return {
      hash: receipt.transactionHash,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return {}
  }
}
