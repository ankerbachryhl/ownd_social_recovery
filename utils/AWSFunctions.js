import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
dotenv.config()

const kmsClient = new AWS.KMS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Credentials for your IAM user
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Credentials for your IAM user
  region: process.env.AWS_REGION
});

export const encryptWithCMK = async (buffer) => {
  const payload = {
    KeyId: process.env.AWS_CMK_KEY_ID, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
    Plaintext: buffer // The data to encrypt.
  };

  const { CiphertextBlob } = await kmsClient.encrypt(payload).promise();
  
  console.log("Encrypted with CMK AWS KMS: ", CiphertextBlob)
  return CiphertextBlob
}

export const decryptWithCMK = async (CiphertextBlob) => {
  const payload = {
    CiphertextBlob: CiphertextBlob // The data to decrypt
  }
  const { Plaintext } = await kmsClient.decrypt(payload).promise();

  console.log("Decrypted with CMK AWS KMS: ", Plaintext.toString())
  return Plaintext.toString()
}