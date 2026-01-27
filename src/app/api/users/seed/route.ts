import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, User } from './../../../../generated/client';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// Seed route to populate the database only with users
export async function POST(request: Request) { 

    try {

        // 3.Seed a unique superuser account
        await prisma.user.deleteMany({});

        const users: User[] = [
            {
                id: crypto.randomUUID(),
                name: "Federico Arzuaga",
                email: "fede.arzuaga.perdomo@gmail.com",
                password: bcrypt.hashSync("Fran29092012!", 10),
                phone: "092345332",
                createdAt: new Date(),
                image: null,
                role: "SUPERUSER",
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                name: "Fernando Llambías",
                email: "ferllambis@gmail.com",
                password: bcrypt.hashSync("salmo8318", 10),
                phone: "094666575",
                createdAt: new Date(),
                image: null,
                role: "ADMIN",
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                name: "Diego Demarco",
                email: "demarcodiego@hotmail.com",
                password: bcrypt.hashSync("salmo8318", 10),
                phone: "099280125",
                createdAt: new Date(),
                image: null,
                role: "LEADER",
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                name: "Martín Otarola",
                email: "motarola@hotmail.com",
                password: bcrypt.hashSync("salmo8318", 10),
                phone: "099992222",
                createdAt: new Date(),
                image: null,
                role: "USER",
                updatedAt: new Date(),
            }
        ]

        const initialUsers = await prisma.user.createMany({
            data: users
        })

        return NextResponse.json({ 
            message: 'Seed completed',
            initialUsers
        }, { status: 200 });

    } catch (error) {
        
        // Check if it's a standard Error object
        if (error instanceof Error) {
            return NextResponse.json({ 
                message: 'Seed failed', 
                error: error.message 
            }, { status: 500 });
        }
        
        // Fallback for non-standard errors
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}