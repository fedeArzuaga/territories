import { User } from '@/types/user';
import { prisma } from '../prisma';

export const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany()
    return users;
}

