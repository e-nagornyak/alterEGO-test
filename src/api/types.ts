export type NewsItem = {
    id: string
    description: string
    title: string
    image: string
    created: string
    user_id: string
}

export type Profile = {
    name: string
    email: string
    avatar: string
    status: string
    about: string
    id: string
}

export type UpdateProfile = {
    name?: string
    avatar?: string
    status?: string
    about?: string
}