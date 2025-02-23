const {test, describe, after, beforeEach} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require("mongoose");
const assert = require("node:assert");

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('blog api tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert.ok(blog.id, "'id' property should be defined")
            assert.strictEqual(blog._id, undefined, "'_id' should be undefined")
        })
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert.ok(titles.includes('React patterns'))
    })

    test('if likes are not defined, they default to 0', async () => {
        const newBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/'
        }

        const response = await api.post('/api/blogs').send(newBlog)
        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title or url is not added', async () => {
        const newBlog = {
            author: 'Michael Chan',
            likes: 7
        }

        const response = await api.post('/api/blogs').send(newBlog)
        assert.strictEqual(response.status, 400)
    })

    test('deleting a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        assert.ok(!titles.includes(blogToDelete.title))

    })
})


after(async () => {
    await mongoose.connection.close()
})