//  return new Promise((resolve, reject) => {
//       if (!file) {
//         reject('No file selected')
//       } else {
//       }
//       let newFileName = `${file.originalname}`

//       let fileUpload = bucket.file(newFileName)
//       const blobStream = fileUpload.createWriteStream({
//         metadata: {
//           metadata: {
//             contentType: file.mimeType,
//             cacheControl: 'public',
//             firebaseStorageDownloadTokens: token,
//           },
//           public: true,
//         },
//       })

//       blobStream.on('error', (error) => {
//         reject('Something is wrong! Unable to upload at the moment.')
//       })

//       blobStream.on('finish', () => {
//         // The public URL can be used to directly access the file via HTTP.
//         const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${newFileName}?alt=media&token=${token}`
//         resolve(url)
//         Signature.find()
//           .sort({ version: -1 })
//           .limit(1)
//           .exec((err, latestPost) => {
//             latestPost.map((data) => {
//               let version = data.version + 1
//               Signature.create({
//                 version: version,
//                 signatureFile: url,
//               }).then((data) => {
//                 console.log(data)
//               })
//             })
//             if (err) {
//               console.error(err)
//               return
//             }
//           })
//         console.log()
//       })
//       blobStream.end(file.buffer)
//     })
//   }
//   if (file) {
//     uploadSignature(file)
//       .then((success) => {
//         res.status(200).send({
//           status: 'Signiture Uploaded successfully',
//         })
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }