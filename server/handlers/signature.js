const Signature = require('../modals/signatureModal.js')
const storage = require('../fb.js')
const crypto = require('crypto')
const fs = require('fs')

exports.getSignature = (req, res) => {
  console.log(req.userData)
  Signature.where('version')
    .gt(req.body.version)
    .then((data) => {
      res.json(data)
      // const receivedMessage = signedFile.file
      // const receivedSignature = signedFile.signature
      // const receivedPublicKey = crypto.createPublicKey(signedFile.publicKey)
      // try {
      //   const isVerified = crypto.verify(
      //     'sha256',
      //     Buffer.from(receivedMessage),
      //     {
      //       key: receivedPublicKey,
      //       padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      //     },
      //     receivedSignature,
      //   )
      //   console.log(
      //     isVerified ? 'Signature is valid.' : 'Signature is invalid.',
      //   )
      // } catch (error) {
      //   console.error(error)
      // }
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

exports.postSignature = (req, res) => {
  try {
    const filePath = req.file.path
    const fileContent = fs.readFileSync(filePath)

    // Generate signature
    const signer = crypto.createSign('SHA256')
    signer.update(fileContent)
    const signature = signer.sign(privateKey, 'base64')

    // Upload file to Firebase Storage
    const fileName = req.file.originalname
    const fileDest = `${Date.now()}_${fileName}`
    const file = bucket.file(fileDest)
    const writeStream = file.createWriteStream({
      contentType: req.file.mimetype,
    })
    writeStream
      .on('finish', async () => {
        const fileUrl = await file.getSignedUrl({
          action: 'read',
          expires: '03-17-2023', // Set expiration date for the URL
        })
        res.json({ success: true, url: fileUrl[0], signature: signature })
        console.log({ success: true, url: fileUrl[0], signature: signature })
      })
      .end(fileContent)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to upload file' })
  }
}
