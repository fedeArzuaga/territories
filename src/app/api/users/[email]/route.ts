import { isValidEmail } from '@/helpers/isValidEmail';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ email: string }> }) { 

    const { email } = await params;

    if ( !email ) {
        return new Response(JSON.stringify({
            message: 'Email is required'
        }), { status: 400 } );
    }

    if ( !isValidEmail( email ) ) {
        return new Response(JSON.stringify({
            message: 'Please enter a valid email address'
        }), { status: 400 } );
    }

    try {
        const activeUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return new Response(JSON.stringify({
            message: 'Hello World',
            user: activeUser
        }), { status: 200 } ) || null;
    }
    catch ( error ) {
        return new Response(JSON.stringify({
            message: 'Internal server error',
            error
        }), { status: 500 } );
    }

}