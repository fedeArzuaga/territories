import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { polygons } from "@/data/polygons";
import { TerritoryCardDetails } from "../components/TerritoryCardDetails";
import { State } from "@/types/polygon";

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
                            polygons.map( ({ 
                                id,
                                territory,
                                square,
                                state,
                                lastLeader,
                                started,
                                finished 
                            }) => (
                                <CustomCard key={ id }>
                                    <TerritoryCardDetails
                                        territory={territory}
                                        square={square}
                                        state={state as State}
                                        lastLeader={lastLeader}
                                        started={started}
                                        finished={finished}
                                        id={id}
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