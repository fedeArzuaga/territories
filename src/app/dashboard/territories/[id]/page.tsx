
import { Widget } from "@/components/Widget/Widget";
import { EditTerritoryForm } from "@/components/Dashboard/EditTerritory/EditTerritoryForm";
import { CancelTerritoryEditionButton } from "@/components/Dashboard/EditTerritory/CancelTerritoryEditionButton";

export default function EditTerritoryPage() {

    return (
        <div className="w-full">
            <h1 className="text-5xl font-bold mb-2">Editar territorio</h1>
            <EditTerritoryForm />
        </div>
    );
}