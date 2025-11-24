
import { posts } from './server/postsData'

export default {
    sitemaps: {
        default: {
            urls: [
                '/',
                '/about',
                '/blog',
                ...posts.map(p => `/blog/${p.slug}`)
            ]
        }
    }
}
