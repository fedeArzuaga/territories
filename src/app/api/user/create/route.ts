import { propercaseString } from '@/helpers/propercaseString';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/user';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) { 

    const data = await request.json()

    // Make sure we're saving the name correctly formatted (Propercase words)
    const userName: string = propercaseString( data.fullName )
    
    try {
        
        const user: User = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                name: userName,
                email: data.email,
                password: bcrypt.hashSync(data.password, 10),
                phone: data.phone,
                createdAt: new Date(),
                image: null,
                role: data.role,
                updatedAt: new Date(),
            },
        })

        return new NextResponse(JSON.stringify({
            message: 'User created successfully',
            user
        }), { status: 200 } );

    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Something wrong happened',
            error
        }), { status: 401 } );
    }
}