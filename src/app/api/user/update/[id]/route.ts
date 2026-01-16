import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request, { params }: { params: { id: string } }) { 

    const { id } = await params;
    const body = await request.json()

    try {

        console.log( id )

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: body.email,
                password: await bcrypt.hash(body.password, 10)
            }
        })

        return new Response(JSON.stringify({
            message: 'User updated successfully',
            user: updatedUser
        }), { status: 200 } );

    } catch ( error ) {
    
        return new Response(JSON.stringify({
            message: 'Something went wrong',
            error: error
        }), { status: 500 } );

    }

}