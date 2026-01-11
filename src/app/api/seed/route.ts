import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, User } from '../../../generated/client';
import { NextResponse } from 'next/server'
import { squaresData, territoriesData } from '@/data/polygons';
import bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const parseDate = (dateString: string | undefined | null) => {
    if (!dateString || dateString.trim() === "") return null;
    const date = new Date(dateString);
    // Check if the date is actually valid
    return isNaN(date.getTime()) ? null : date;
};

// Seed route to populate the database
export async function GET(request: Request) { 
    try {

        // 1. Clean up existing data to avoid "Unique constraint" errors
        await prisma.square.deleteMany({});
        await prisma.territory.deleteMany({});

        // 2. Seed territories and squares
        const territoriesSaved = []

        for (const id of Object.keys(territoriesData)) {
            const currentId = parseInt(id)
            const territory = territoriesData[currentId];
            const created = await prisma.territory.create({
                data: {
                    id: territory.id,
                    territoryState: territory.territoryState,
                    lastLeaderName: territory.lastLeader,
                    notes: territory.notes,
                    started: parseDate(territory.started),
                    finished: parseDate(territory.finished),
                    squares: {
                        create: territory.squareIds.map(squareId => ({
                            id: String(squareId),
                            squareNumber: squaresData[squareId].squareNumber,
                            state: squaresData[squareId].state,
                        }))
                    }
                }
            })
            territoriesSaved.push(created)
        }

        // 3.Seed a unique superuser account
        const mySuperUser: User = {
            id: crypto.randomUUID(),
            name: "Federico Arzuaga",
            email: "fede.arzuaga.perdomo@gmail.com",
            password: bcrypt.hashSync("Fran29092012!", 10),
            phone: "092345332",
            createdAt: new Date(),
            image: null,
            role: "SUPERUSER",
            updatedAt: new Date(),
        }

        const superUser = await prisma.user.create({
            data: mySuperUser
        })

        return NextResponse.json({ 
            message: 'Seed completed', 
            territoriesSaved,
            superUser
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