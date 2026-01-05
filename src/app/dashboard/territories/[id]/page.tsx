import { redirect } from "next/navigation";
import { MdCancel } from "react-icons/md";

import { Widget } from "@/components/Widget/Widget";
import { Button } from "@/components/ui/Button/Button";
import { EditTerritoryForm } from "@/components/Dashboard/EditTerritory/EditTerritoryForm";
import { CancelTerritoryEditionButton } from "@/components/Dashboard/EditTerritory/CancelTerritoryEditionButton";

export default function EditTerritoryPage() {

    return (
        <div className="w-full">
            <h1 className="text-5xl font-bold mb-2">Editar territorio</h1>
            <div className="mb-8 mt-4 flex flex-row justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Territorio N° 25</h2>
                    <p className="text-md text-gray-400 font-bold">
                        Manzana N° 2
                    </p>
                </div>
                <div>
                    <CancelTerritoryEditionButton />
                </div>
            </div>

            <Widget title="Información del Territorio" type="default">
                <EditTerritoryForm />
            </Widget>
        </div>
    );
}