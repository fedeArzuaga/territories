import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) { 

    const { id } = await params;
    const body = await request.json()

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                image: body.image || null,
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