export default defineNuxtConfig({
    modules: [
        '@nuxtjs/sitemap',
        'nuxt-simple-sitemap',
        '@nuxtjs/robots'
    ],


    robots: {
        allow: ['/'],
        disallow: ['/admin', '/api'],
        sitemap: '/sitemap.xml'
    }
})
