import { Square } from "@/components/Square/Square";
import { getAllSquares } from "@/lib/services/getAllSquares";

export const metadata = {
    title: 'Mapa del territorio',
    description: 'Este es el mapa del territorio de la congregación Los Bulevares',
}

export default async function MapPage() {
    const squares = await getAllSquares();
    console.log(squares)

    return (
        <>
            {
                squares.map(square => (
                    <Square 
                        key={square.id}
                        squareData={square}
                    />
                ))
            }
        </>
    );
}