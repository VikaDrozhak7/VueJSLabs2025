import { posts } from '../../postsData'


export default defineEventHandler((event) => {
    const { slug } = event.context.params as { slug: string }

    const post = posts.find(p => p.slug === slug)

    if (!post) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Post not found'
        })
    }

    return post
})
