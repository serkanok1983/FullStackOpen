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

router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

router.put('/:id', async (req, res) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(updatedBlog)
})

module.exports = router