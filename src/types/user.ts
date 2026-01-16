export interface User {
    id: string,       
    name: string,     
    email: string,     
    password: string,
    phone: string | null,
    createdAt: Date,
    updatedAt: Date,
    image: string | null,
    role: string
}