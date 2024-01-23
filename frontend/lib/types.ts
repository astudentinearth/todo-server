export interface Todo{
    id: string,
    content: string,
    completed: boolean
}

export interface UserSession{
    userAgent: string,
    expire: string,
    loginTimestamp: string
}