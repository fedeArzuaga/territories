import { CustomTable } from "@/components/ui/Table/CustomTable";
import { Widget } from "@/components/Widget/Widget";
import { polygons } from "@/data/polygons";

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
                    <CustomTable
                        territoryState={ polygons }
                    />
                </Widget>
            </div>
        </div>
    );
}