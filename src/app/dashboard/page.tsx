import { CustomCard } from "@/components/ui/Card/CustomCard";
import { CustomGrid } from "@/components/ui/CustomGrid/CustomGrid";
import { Widget } from "@/components/Widget/Widget";
import { MOCK_TERRITORY_DATA } from "@/data/MockSimpleTerritoryData";
import { TerritoryCardDetails } from "./components/TerritoryCardDetails";
import { getAllTerritories } from "@/lib/services/getAllTerritories";

export default async function DashboardPage() {

    const territories = await getAllTerritories({ limit: 6 });

    return (
        <div>
            <h1 className="text-5xl font-bold mb-8">
                {/* //TODO: Replace with user's real data */}
                Bienvenido, Fernando
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Widget
                        title="Último territorio completado:"
                        type="primary"
                    >
                        <p className="text-xl font-bold">
                            Territorio N° 25
                        </p>
                        <p className="mt-0 font-bold">
                            Manzana N° 2
                        </p>
                        <div className="mt-3">
                            <p>
                                <b>Último conductor:</b> Pablo Scigliano
                            </p>
                            <p>
                                <b>Fecha de inicio:</b> 10/05/2025
                            </p>
                            <p>
                                <b>Fecha de finalizado:</b> 24/05/2025
                            </p>
                        </div>
                    </Widget>
                </div>
                <div className="xl:col-span-3">
                    <Widget
                        title="Territorios más frecuentes:"
                        type="default"
                    >
                        <CustomGrid
                            cssClasses="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
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
        </div>
    );
}