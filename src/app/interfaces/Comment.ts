//src>app>interfaces>Comment.ts
export interface IComment {
    id?: string
    text: string
    username:string
    momentId: number
    created_at?: string
    updated_at?: string
}