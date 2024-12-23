const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const imageUploader = require('../utils/imageUploader');
const {videoUploader} = require('../utils/imageUploader')
require('dotenv').config();

exports.createSubsection = async(req ,res)=>{
    try {
        //fetch data
        const {title , description ,sectionId } = req.body
        const video = req.files.videoFile;
        console.log("video : ",video)

        //validation
        if(!title || !description || !video){
            return res.status(400).json({error:"Please fill all the fields",data :req.body});
        }

        //upload video on cloudinary
        const uploadedDetails = await imageUploader.mediaUploader(video , "studyNotion",null,null,'video');
        console.log("upload details : ",uploadedDetails);

        //create Subsection
        const subSectionDetails =  await SubSection.create({
            title , description ,timeDuration : uploadedDetails.duration, videoUrl : uploadedDetails.secure_url
        })

        //update section with the sub section object
        const updatedSection = await Section.findByIdAndUpdate({_id : sectionId} ,{
            $push :{subSections : subSectionDetails._id}
        },{new : true}).populate('subSections');
        console.log("update section " ,updatedSection);

        //return response
        return res.status(200).json({success:true ,  message : "Subsection created successfully" , data :updatedSection});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to create Subsection ,Please try again", error });
    }
}

exports.updateSubsection = async(req ,res)=>{
    // try {
    //     //fetch data
    //     const {title , description  ,SubSectionId } = req.body
    //     const video = req.files.videoFile;
    //     console.log("req body",req.body)
    //     //validation
    //     if(!title || !description || !SubSectionId){
    //         return res.status(400).json({error:"Please fill all the fields" });
    //     }

    //     //upload video on cloudinary
    //     const uploadedDetails = await imageUploader.mediaUploader(video , "studyNotion",null,null,'video');
    //     console.log("upload details : ",uploadedDetails);
    //     //create Subsection
    //     const updatedSubSectionDetails =  await SubSection.findByIdAndUpdate ( SubSectionId,{
    //         title , description ,timeDuration : uploadedDetails.duration, videoUrl : uploadedDetails.secure_url
    //     },{new :true})

    //     if(!updatedSubSectionDetails){
    //         return res.status(400).json({error : "Subsection not created" })
    //     }
    try {
        const { sectionId,subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
          const video = req.files.video
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${uploadDetails.duration}`
        }
    
        await subSection.save()
    
        const updatedSection = await Section.findById(sectionId).populate("subSection")
  
        //return response
        return res.status(200).json({success:true,message : "Subsection update successfully" , subsection :updatedSection});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to create Subsection ,Please try again", error });
    }
}

exports.getSubSectionDetails = async(req ,res) =>{
    try {
        const { subSectionId} = req.body;
        if(!subSectionId){
            return res.status(400).json({error:"id missing" });
        }

        const subSectionDetail = await SubSection.findById (subSectionId);
        return res.status(200).json({success:true, message : "Successfully fetch seub section" , data :subSectionDetail});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to get subsection ,Please try again", error });
    }
}

// exports.deleteSubSection = async (req ,res ) =>{
//     try {
//         //get sub Section id
//         const {subSectionId} = req.body;

//         if(!subSectionId){
//             return res.status(400).json({error:"sub section not found" });
//         }

//         const updated 

//     } catch (error) {
        
//     }
// }