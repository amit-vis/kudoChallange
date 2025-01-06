const Kudos = require('../model/kudos');

module.exports.create = async (req, res)=>{
    try {
        const {kudos} = req.body;
        let kudosData = await Kudos.create({
            kudos: kudos
        })

        return res.status(201).json({
            message: "Kudos created successfully",
            success: true,
            data: kudosData
        })

    }catch (error) {
        return res.status(500).json({
            message: "Internal server error in create the kudos",
            error: error.message
        })
    }
}

module.exports.getAll = async (req, res)=>{
    try {
        let kudosData = await Kudos.find();
        return res.status(200).json({
            message: "All kudos",
            success: true,
            data: kudosData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the kudos",
            error: error.message
        })
    }
}