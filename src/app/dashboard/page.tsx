import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { TerritoryCardDetails } from "./components/TerritoryCardDetails";
import { getAllTerritories } from "@/lib/services/getAllTerritories";
import { UserGreeting } from "./components/UserGreeting";
import { InfoBlock } from "./components/InfoBlock";
import { UpcomingTerritoriesToExpire } from "./components/dashboard/UpcomingTerritoriesToExpire";
import { LastEditedTerritory } from "./components/dashboard/LastEditedTerritory";
import Link from "next/link";

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
                                    <Link 
                                        key={ territory.id } 
                                        href={`/dashboard/territories/${territory.id}`}
                                        className="block h-full"
                                    >
                                        <CustomCard 
                                            cssClasses={ 
                                                territory.category === "Personal" 
                                                    ? "border-blue-600" 
                                                    : "border-teal-500" 
                                            }
                                        >
                                            <TerritoryCardDetails
                                                territory={ territory }
                                            />
                                        </CustomCard>
                                    </Link>
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