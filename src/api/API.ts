import axios from "axios";
import {NewsItem, Profile, UpdateProfile} from "api/types";

const instance = axios.create({
    baseURL: 'https://63fb3b564e024687bf748105.mockapi.io/e-news'
})

export const newsAPI = {
    getNews: (page?: number) => instance.get<NewsItem[]>('/news', {
        params: {
            page,
            "limit": 6
        }
    }),
    deleteNews: (id: string) => instance.delete(`/news/${id}`),
}

export const profileAPI = {
    getProfile: () => instance.get<Profile>('/profile/1'),
    updateProfile: (data: UpdateProfile) => instance.put<Profile>('/profile/1', data),
}