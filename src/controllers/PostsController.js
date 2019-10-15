const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().catch(error => {
            return res.status(400).json({ error });
        });

        return res.json(posts);
    },

    async store(req, res) {
        const { title, body, likes, author }  = req.body;

        const post = await Post.create({
            title,
            body,
            likes,
            author,
        }).catch(error => {
            return res.status(400).json({ error });
        });

        return res.json(post);
    },

    async delete(req, res) {
        await Post.deleteOne({_id : req.params.id}, error => {
            error ? null : res.status(200).json({ deleted: true });
        }).catch(error => {
            res.status(400).json({ deleted: error });
            console.log(error);
        });
    },

    async edit(req, res){
        const { title, body, likes, author }  = req.body;

        const post = await Post.updateOne({_id : req.params.id}, {
            title,
            body,
            likes,
            author,
        }).catch(error => {
            res.status(400).json({ error })
            console.log(error);
        });

        return res.json({ modified: post.nModified });
    },

    async view(req, res){
        const post = await Post.findById({_id : req.params.id}).catch(error => {
            res.status(400).json({ error })
            console.log(error);
        });

        return res.json(post);
    }
};
