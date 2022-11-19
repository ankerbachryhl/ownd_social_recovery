import ethers from "ethers"

export const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom()
  console.log({
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  })

  return wallet
}