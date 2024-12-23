const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        //create entry in db
        const category = await Category.create({ name, description });
        console.log(category);

        //return response
        return res.status(200).json({success : true , message : "tag created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        // fetch data from db
        const allCategory = await Category.find({}, { name: true, description: true });
        //return response
        return res.status(200).json({ success: true, message: "All Category return successfully", data: allCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong while fetching all Category",error : error  });
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        //fetch category id
        const { categoryId,name } = req.body;
        //get course for specified categoryId
        const selectedCategory = await Category.find({ name }).populate("course").exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Data not found" })
        }

        //get course for different category
        // const differentCategories = await Category.find({ _id: { $ne: categoryId } }).populate("course").exec();

        //get top selling courses  
        // const topSellingCourses = await Course.find({}).populate("category").sort({studentsEnrolled : -1 })

        //return response
        return res.status(200).json({ success: true,message : "Course fetch successfully" , selectedCategory,});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong"});
    }
}

