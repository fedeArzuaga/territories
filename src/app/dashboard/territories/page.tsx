import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { TerritoryCardDetails } from "../components/TerritoryCardDetails";
import { territoriesData } from "@/data/polygons";
import { getAllTerritories } from "@/lib/services/getAllTerritories";

export default async function TerritoriesPage() {

    const territories = await getAllTerritories({
        includeSquares: true,
    })

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
                        cssClasses="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                    >
                        {
                            territories.map( territory => (
                                <CustomCard key={ territory.id }>
                                    <TerritoryCardDetails
                                        territory={ territory }
                                    />
                                </CustomCard>
                            ))
                        }
                    </CustomGrid>
                </Widget>
            </div>
        </div>
    );
}