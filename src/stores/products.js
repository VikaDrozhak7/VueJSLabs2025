import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
    state: () => ({
        items: [
            {
                id: 1,
                key: 'macbook',
                price: 1399,
                image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
                rating: 4.9
            },
            {
                id: 2,
                key: 'iphone',
                price: 1199,
                image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
                rating: 4.8
            },
            {
                id: 3,
                key: 'sony',
                price: 399,
                image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
                rating: 4.7
            },
            {
                id: 4,
                key: 'samsung',
                price: 699,
                image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
                rating: 4.6
            }
        ]
    })
})
