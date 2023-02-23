export type newsItem = {
    userId: number,
    id: number,
    title: string,
    body: string
    status: 'loading' | 'idle'
}
