import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { TerritoryCardDetails } from "../components/TerritoryCardDetails";
import { territoriesData } from "@/data/polygons";

export default function TerritoriesPage() {
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
                            Object.keys(territoriesData).map( territoryId => (
                                <CustomCard key={ territoryId }>
                                    <TerritoryCardDetails
                                        territoryId={ territoryId }
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