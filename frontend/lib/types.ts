export interface Todo{
    id: string,
    content: string,
    completed: boolean
}

export interface UserSession{
    os: string,
    browser: string,
    expire: string,
    loginTimestamp: string
}