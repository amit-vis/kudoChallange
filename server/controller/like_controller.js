const PostKudo = require('../model/postKudos');
const Like = require('../model/like');

module.exports.toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const checkPost = await PostKudo.findById(postId);

        if (!checkPost) {
            return res.status(400).json({
                message: "Post not found",
                success: false
            });
        }

        let message = "";
        const checkLike = await Like.findOne({ user: req.user._id, post: checkPost._id });

        if (checkLike) {
            // Toggle the like status
            checkLike.isLike = !checkLike.isLike;
            await checkLike.save();

            if (checkLike.isLike) {
                checkPost.like.push(checkLike._id);
                message = "You liked the post!";
            } else {
                checkPost.like.pull(checkLike._id);
                message = "You unliked the post!";
            }

            await checkPost.save();
        } else {
            // Create a new like
            const likeData = await Like.create({
                user: req.user._id,
                post: checkPost._id,
                isLike: true
            });
            checkPost.like.push(likeData._id);
            await checkPost.save();
            message = "You liked the post!";
        }

        return res.status(200).json({
            message,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in toggling the like",
            error: error.message
        });
    }
};


module.exports.getLike = async (req, res)=>{
    try {
        const likData = await Like.find();
        if(!likData || likData.length === 0){
            return res.status(400).json({
                message: "No data available",
                success: false
            })
        }
        return res.status(200).json({
            message: "Like Data fectched successfully!",
            success: true,
            data: likData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server in getting an like data",
            error: error.message
        })
    }
}