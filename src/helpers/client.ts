import { MerkleAPIClient } from '@standard-crypto/farcaster-js'
import { Wallet } from 'ethers'
import env from '@/helpers/env'

const wallet = Wallet.fromMnemonic(env.FARCASTER_SEED)

export default new MerkleAPIClient(wallet)
