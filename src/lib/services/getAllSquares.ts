import { prisma } from "../prisma";

export const getAllSquares = async () => {
    const squares = await prisma.square.findMany({ include: { territory: true } });
    return squares;
}