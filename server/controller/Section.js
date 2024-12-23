const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res) => {
    try {
        //fetch data from body
        const { sectionName, courseId } = req.body;

        //validation
        if (!sectionName) {
            return res.status(400).json({ success: false, messaage: "All fields are require" });
        }

        //create Section
        const newSection = await Section.create({ sectionName });

        //updated course
        const updatedCourseDetail = await Course.findByIdAndUpdate(courseId, {
            $push: { courseContent: newSection._id }
        }, { new: true }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSections', // Populate nested subfields
                model: 'SubSection' // Ensure you specify the correct model name
            }
        })

        //return response
        return res.status(200).json({ success: true, messaage: "Section created successfully", data: updatedCourseDetail })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to create section , please try again", error: error.message });
    }
}

exports.updateSection = async (req, res) => {
    try {
        //fetch data from body
        const { sectionName, sectionId } = req.body;

        //validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({ success: false, messaage: "All fields are require" });
        }

        //update section in DB
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, {
            sectionName: sectionName
        }, { new: true });

        //response return 
        return res.status(200).json({ success: true, messaage: "Section updated successfully", data: updatedSection })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to update section ,Please try again", error });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, courseId } = req.body;

        //validation
        if (!sectionId) {
            return res.status(400).json({ success: false, messaage: "Id required ,try again" });
        }

        //Update courseContent by Remove section id from courseContent
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: { sectionId }
            }
        })

        //Get Section from DataBase 
        const section = await Section.findById(sectionId)
        if (!section) (res.status(404).json({ success: false, message: "Section not found" }))

        //delete Sub Sections of Section 
        await SubSection.deleteMany({ _id: { $in: section.subSections } });

        //delete Section
        await Section.findByIdAndDelete(sectionId)

        //return the updated course 
        const updatedCourse = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate : {
                path : "subSections"
            }
        })

        //return response
        return res.status(200).json({ success: true, message: "Section deleted" , updatedCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Unable to delete section ,Please try again", error });
    }
}