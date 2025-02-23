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
})


after(async () => {
    await mongoose.connection.close()
})