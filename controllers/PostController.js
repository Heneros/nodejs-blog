import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        ///Find alll posts. Объединить посты с юзером
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to fetch posts.',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        ///динамический айдию. /:id'
        const postId = req.params.id;
        /////////Обновить кол. просмотров статьи
        PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to fetch posts.',
        });
    }
}



export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });
        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create post.',
        });
    }
}