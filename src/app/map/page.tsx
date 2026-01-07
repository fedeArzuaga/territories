import { Square } from "@/components/Square/Square";
import { squaresData } from "@/data/polygons";

export const metadata = {
    title: 'Mapa del territorio',
    description: 'Este es el mapa del territorio de la congregación Los Bulevares',
}

export default function MapPage() {
    return (
        <>
            {
                Object.keys(squaresData).map( squareId => (
                    <Square 
                        key={ squaresData[squareId].id }
                        squareData={ squaresData[squareId] }
                    />
                ))
            }
        </>
    );
}