import ethers from "ethers"
import * as dotenv from 'dotenv'
dotenv.config()

import { createWallet } from "./utils/EtherFunctions.js"
import { encryptWithCMK, decryptWithCMK } from "./utils/AWSFunctions.js"

const encrypt = async (wallet) => {
  const encryptedWithEther = await wallet.encrypt(process.env.ETHER_ENCRRYPTION_PASSWORD)
  console.log("Encrypted with ether: ", encryptedWithEther)

  const encryptedWithCMK = await encryptWithCMK(Buffer.from(encryptedWithEther.toString(), 'utf-8'))
  return encryptedWithCMK
}

const decrypt = async (encryptedWithCMK) => {
  const decryptedWithCMK = await decryptWithCMK(encryptedWithCMK)

  const decryptedWithEther = await ethers.Wallet.fromEncryptedJson(decryptedWithCMK, process.env.ETHER_ENCRRYPTION_PASSWORD)
  console.log("Decrypted with ether: ", decryptedWithEther)
  return decryptedWithEther
}

const main = async () => {
  const wallet = await createWallet()
  const encryptedWithCMK = await encrypt(wallet)
  const decryptedWithEther = await decrypt(encryptedWithCMK)
}

main()