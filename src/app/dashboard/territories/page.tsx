import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { TerritoryCardDetails } from "../components/TerritoryCardDetails";
import { getAllTerritories } from "@/lib/services/getAllTerritories";
import Link from "next/link";

export default async function TerritoriesPage() {

    const territories = await getAllTerritories({
        includeSquares: true,
    })

    console.log( territories )

    return (
        <div>
            <h1 className="text-5xl font-bold mb-8">
                Administrar territorios
            </h1>
            <div>
                <Widget
                    type="default"
                >
                    <CustomGrid
                        cssClasses="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-6"
                    >
                        {
                            territories.map( territory => (
                                <Link 
                                    key={ territory.id } 
                                    href={`/dashboard/territories/${territory.id}`}
                                    className="block"
                                >
                                    <CustomCard
                                        cssClasses={ 
                                            territory.category === "Personal" 
                                                ? "border-blue-600" 
                                                : "border-teal-500" 
                                        }
                                    >
                                        <TerritoryCardDetails territory={ territory } />
                                    </CustomCard>
                                </Link>
                            ))
                        }
                    </CustomGrid>
                </Widget>
            </div>
        </div>
    );
}