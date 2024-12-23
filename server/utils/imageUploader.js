
const cloudinary = require('cloudinary');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET    // Your Cloudinary API secret
});

exports.mediaUploader = async (file, folder, height, quality, resource_type) => {
    const options = { folder, resource_type };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type =  resource_type || "auto";
    console.log(file.tempFilePath); 
    try {
        let result = await cloudinary.v2.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.log("Upload failed ", error)
    }
}

exports.videoUploader = (file, folder) => {


    try {
        const respone = cloudinary.uploader.upload_large(file,
            {
                resource_type: "video",
                chunk_size: 6000000
            },
            function (error, result) {
                console.log(result.secure_url, error);
            });
        return respone
    } catch (error) {
        console.log("Upload failed ", error)
    }
    // console.log(respone.secure_url)
}
