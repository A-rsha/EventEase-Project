const cloudinary = require('../config/cloudinaryConfig')

const uploadedToCloudinary = (filepath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filepath,
            { folder: 'products' },
            (error, result) => {
                if (error) return reject(error)
                resolve(result.secure_url)
            }
        )
    })
}


    module.exports=uploadedToCloudinary
