const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    if (!blog.title || !blog.url) {
        return res.status(400).json({error: 'title and url are required'})
    }
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

module.exports = router