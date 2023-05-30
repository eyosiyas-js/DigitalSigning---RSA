const file = require('./file.pptx')

 receivedMessage = file.file
      const receivedSignature = file.signature
      const receivedPublicKey = crypto.createPublicKey(file.publicKey)
      try {
        const isVerified = crypto.verify(
          'sha256',
          Buffer.from(receivedMessage),
          {
            key: receivedPublicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          },
          receivedSignature,
        )
        console.log(
          isVerified ? 'Signature is valid.' : 'Signature is invalid.',
        )
      } catch (error) {
        console.error(error)
      }