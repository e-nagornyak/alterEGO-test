import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const newsAPI = {
    getNews: (page?: number) => instance.get('/posts', {params: {"_page": page, "_limit": 8}}),
    deleteNews: (id: number) => instance.delete(`/posts/${id}`),
}