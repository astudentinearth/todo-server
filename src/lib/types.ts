/** Represents a single todo item. */
export interface Todo{
    id: string,
    content: string,
    completed: boolean,
    due_date?: Date | null
}

/** Represents a user session. */
export interface UserSession{
    os: string,
    browser: string,
    expire: string,
    loginTimestamp: string
}

/** Represents a toast notification. */
export interface Toast{
    id: string,
    /** Time in miliseconds for the notification to disappear */
    timeout: number, 
    /** Type of the notification. Defines the icon shape and color. */
    level: "error" | "info" | "warning",
    content: string
}