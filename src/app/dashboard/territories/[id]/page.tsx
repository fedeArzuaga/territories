import { EditTerritoryForm } from "@/components/Dashboard/EditTerritory/EditTerritoryForm";
import { getTerritoryBasedOnId } from "@/lib/services/getTerritoryBasedOnId";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";

export default async function EditTerritoryPage({ params }:{ params: { id: number } }) {

    const { id } = await params;
    const territory = await getTerritoryBasedOnId(id);
    const { id: managerId, role } = await getUserByActiveSession()

    if ( !territory ) return <div>Territorio no encontrado</div>

    return (
        <div className="w-full">
            <h1 className="text-5xl font-bold mb-2">Editar territorio</h1>
            <EditTerritoryForm 
                territory={territory} 
                managerId={ managerId }
                role={ role }
            />
        </div>
    );
}