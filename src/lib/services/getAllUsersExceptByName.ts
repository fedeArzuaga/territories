import { User } from '@/types/user';
import { prisma } from '../prisma';

export const getAllUsersExceptByName = async ( userName: string ): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                name: userName
            }
        }
    })
    return users;
}

