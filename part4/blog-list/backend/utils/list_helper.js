const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
}

const mostBlogs = (blogs) => {
    const authors = blogs.reduce((authors, blog) => {
        if (authors[blog.author]) {
            authors[blog.author]++
        } else {
            authors[blog.author] = 1
        }
        return authors
    }, {})

    const author = Object.keys(authors).reduce((max, author) => authors[max] > authors[author] ? max : author, Object.keys(authors)[0])

    return {
        author,
        blogs: authors[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}