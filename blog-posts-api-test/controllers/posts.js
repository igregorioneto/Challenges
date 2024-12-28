const { is } = require('bluebird');
const Posts = require('../models/posts');

async function post(req, res, next) {
    try {
        const { title, author, timestamp, isPublished } = req.body;

        if (!title || !author || typeof isPublished === "undefined" || !timestamp) {
            return res.status(400).json({ message: 'Invalid post data' });
        }

        const posts = await Posts.create({
            title,
            author: parseInt(author),
            isPublished,
            timestamp,
            publishedDate: isPublished ? Date.now() : null
        });

        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error create post', error: error.message })
    }
}

async function get(req, res, next) {
    const { author, isPublished } = req.query;
    try {
        const where = {}
        if (author) where.author = author;
        if (isPublished !== undefined) where.isPublished = isPublished === 'true';

        const posts = await Posts.findAll({ where });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error create post', error: error.message })
    }
}

async function getById(req, res, next) {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).send("ID not found");
        }

        const posts = await Posts.findByPk(+id);
        if (!posts) {
            return res.status(404).send('ID not found');
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error create post', error: error.message })
    }
}

async function remove(req, res, next) {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).send("ID not found");
        }

        const posts = await Posts.destroy({where: { id }});
        if (posts === 0) {
            return res.status(405).send('destroy not found');
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: 'Error create post', error: error.message })
    }
}

module.exports = {
    post,
    get,
    getById,
    remove
}