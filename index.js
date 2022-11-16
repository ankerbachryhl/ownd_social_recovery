const ethers = require('ethers')
const config = require('./config.json')

const encryptAndUpload = async () => {
  const wallet = ethers.Wallet.createRandom()
  console.log('\naddress: ', wallet.address)
  console.log('\nmnemonic: ', wallet.mnemonic.phrase)
  console.log('\nprivateKey: ', wallet.privateKey)

  let encrypted = await wallet.encrypt(config.ENCRRYPTION_PASSWORD)
  console.log("\nencrypted: ", encrypted)

  let decrypted = await ethers.Wallet.fromEncryptedJson(encrypted, config.ENCRRYPTION_PASSWORD)
  console.log("\ndecrypted: ", decrypted)
}

const retrieveAndDecrypt = async () => { }

encryptAndUpload()
retrieveAndDecrypt()