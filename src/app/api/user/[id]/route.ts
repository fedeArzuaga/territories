import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) { 

    const { id } = await params;

    try {
        
        const user = await prisma.user.findUnique({
            where: { id }
        })
        return new Response(JSON.stringify({
            user: JSON.stringify(user)
        }), { status: 200 } );

    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Error',
            error
        }), { status: 200 } );
    }

}