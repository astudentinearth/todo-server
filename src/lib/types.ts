/** Represents a single todo item. */
export interface Todo{
    id: string,
    content: string,
    completed: boolean
}

/** Represents a user session. */
export interface UserSession{
    os: string,
    browser: string,
    expire: string,
    loginTimestamp: string
}