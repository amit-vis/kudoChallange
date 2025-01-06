const PostKudo = require('../model/postKudos');
const User = require('../model/user');
const Kudo = require('../model/kudos');

module.exports.create = async (req, res) => {
    try {
        const {reason, toUser, kudoId} = req.body;
        const checkUser = await User.findById(toUser);
        if(!checkUser){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        const kudo = await Kudo.findById(kudoId);
        if(!kudo){
            return res.status(401).json({
                message: "Kudo not found",
                success: false
            })
        }
        const postKudoData = await PostKudo.create({
            reason: reason,
            fromUser: req.user._id,
            toUser: checkUser._id,
            kudo: kudo._id
        });
        return res.status(201).json({
            message: "Post kudo created successfully",
            success: true,
            data: postKudoData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in create the post kudo",
            error: error.message
        })
    }
}

module.exports.getAll = async (req, res) => {
    try {
        let postKudoData = await PostKudo.find()
        .populate('fromUser', 'name')
        .populate('toUser', 'name')
        .populate('kudo', 'kudos')
        .populate('like', 'isLike user');
        return res.status(200).json({
            message: "All post kudos",
            success: true,
            data: postKudoData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the post kudos",
            error: error.message
        })
    }
}

module.exports.getKudosCountPerKudo = async (req, res) => {
    try {
        const kudoCount = await PostKudo.aggregate([
            {
                $group: {
                    _id: "$kudo",  // Group by kudo ID
                    count: { $sum: 1 } // Count occurrences
                }
            },
            {
                $lookup: {
                    from: "kudos", // Reference Kudos collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "kudoDetails"
                }
            },
            {
                $unwind: "$kudoDetails"
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    kudoDetails: 1
                }
            },
            {
                $sort:{count: -1}
            }
        ]);

        return res.status(200).json({
            message: "Kudos Count Per Kudo",
            success: true,
            data: kudoCount
        });
    } catch (error) {
        console.error("Error fetching kudo count per kudo:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

module.exports.getKudosCountPerUser = async (req, res) => {
    try {
        const kudoCount = await PostKudo.aggregate([
            {
                $group: {
                    _id: "$toUser", // Group by user ID who received kudos
                    count: { $sum: 1 } // Count kudos received
                }
            },
            {
                $lookup: {
                    from: "users", // Reference Users collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    userDetails: { name: 1, email: 1 } // Include specific user details
                }
            },
            {
                $sort: {count : -1}
            }
        ]);

        return res.status(200).json({
            message: "Kudos Count Per User",
            success: true,
            data: kudoCount
        });
    } catch (error) {
        console.error("Error fetching kudo count per user:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

module.exports.getMostLikedPost = async (req, res) => {
    try {
        const mostLikedPost = await PostKudo.aggregate([
            // Step 1: Project relevant fields and calculate likeCount
            {
                $project: {
                    reason: 1,
                    fromUser: 1,
                    toUser: 1,
                    kudo: 1,
                    likeCount: { $size: { $ifNull: ["$like", []] } } // Count likes
                }
            },
            // Step 2: Sort by likeCount in descending order
            {
                $sort: { likeCount: -1 }
            },
            // Step 3: Limit to the top liked post
            {
                $limit: 1
            },
            // Step 4: Populate fromUser details
            {
                $lookup: {
                    from: "users",
                    localField: "fromUser",
                    foreignField: "_id",
                    as: "fromUserDetails"
                }
            },
            {
                $unwind: "$fromUserDetails"
            },
            // Step 5: Populate toUser details
            {
                $lookup: {
                    from: "users",
                    localField: "toUser",
                    foreignField: "_id",
                    as: "toUserDetails"
                }
            },
            {
                $unwind: "$toUserDetails"
            },
            // Step 6: Populate kudo details
            {
                $lookup: {
                    from: "kudos",
                    localField: "kudo",
                    foreignField: "_id",
                    as: "kudoDetails"
                }
            },
            {
                $unwind: {
                    path: "$kudoDetails",
                    preserveNullAndEmptyArrays: true // Prevent aggregation failure if no kudo found
                }
            },
            // Step 7: Project the final output
            {
                $project: {
                    _id: 0,
                    reason: 1,
                    fromUser: "$fromUserDetails.name",
                    toUser: "$toUserDetails.name",
                    kudos: "$kudoDetails.value",
                    likeCount: 1
                }
            }
        ]);

        if (mostLikedPost.length === 0) {
            return res.status(404).json({
                message: "No liked posts found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Most liked post details",
            success: true,
            data: mostLikedPost[0]
        });
    } catch (error) {
        console.error("Error fetching most liked post details:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
