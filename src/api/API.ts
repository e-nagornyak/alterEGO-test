import axios from "axios";
import {newsItem} from "./Types";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const newsAPI = {
    getNews: (page?: number) => instance.get('/posts', {params: {"_page": page, "_limit": 8}}),
    deleteNews: (id: number) => instance.delete(`/posts/${id}`),
}