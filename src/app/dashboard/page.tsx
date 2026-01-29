import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { TerritoryCardDetails } from "./components/TerritoryCardDetails";
import { getAllTerritories } from "@/lib/services/getAllTerritories";
import { UserGreeting } from "./components/UserGreeting";
import { InfoBlock } from "./components/InfoBlock";
import { UpcomingTerritoriesToExpire } from "./components/dashboard/UpcomingTerritoriesToExpire";
import { LastEditedTerritory } from "./components/dashboard/LastEditedTerritory";

export default async function DashboardPage() {

    const territories = await getAllTerritories({ limit: 6, customOrder: 'desc' });

    return (
        <div>
            
            <UserGreeting />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                <div className="md:col-span-1">
                    <Widget
                        title="Último territorio trabajado:"
                        type="primary"
                    >
                        <LastEditedTerritory />
                    </Widget>
                </div>

                <div className="xl:col-span-3">
                    <Widget
                        title="Territorios más frecuentes:"
                        type="default"
                    >
                        <CustomGrid
                            cssClasses="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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

            <div className="w-full mt-6">
                <UpcomingTerritoriesToExpire />
            </div>

        </div>
    );
}