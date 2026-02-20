import { Widget } from "@/components/Widget/Widget";
import { getLongestActivityArray } from "@/helpers/getLongestLengthInArray";
import { getAllActivityRegister } from "@/lib/services/getAllActivityRegister";
import { ActivityRegisterRow } from "../components/activityRegister/ActivityRegisterRow";
import { ActivityRegisterDisclaimer } from "../components/activityRegister/ActivityRegisterDisclaimer";
import { mapActivityRegisterData } from "@/helpers/mapActivityRegisterData";
import { AddActivityRegisterButton } from "../components/activityRegister/AddActivityRegisterButton";

const TerritoryRegistryTable = async () => {

    const activityRegisterData = await getAllActivityRegister()
    
    const activityRegistersGroupedByTerritories = mapActivityRegisterData( activityRegisterData )
    const territoriesNumbers = Object.keys( activityRegistersGroupedByTerritories || {} )
    const longestActivityRegister = getLongestActivityArray( activityRegistersGroupedByTerritories || {} )
    const maxAmountOfColumns = longestActivityRegister <= 4 ? 4 : longestActivityRegister

    return (
        <div className="w-full">
            <h1 className="text-5xl font-bold mb-8">Registro de actividad</h1>

            <Widget title="Historial de Salidas" type="default">
                <div className="overflow-x-auto mt-8">
                    {
                        activityRegistersGroupedByTerritories && (
                            <>
                                <table className="min-w-400 border-collapse table-fixed activity-register-table">
                                    <thead>
                                        <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-wider text-gray-500">
                                            <th className="border border-gray-300 p-2 w-20">Núm. de terr.</th>
                                            <th className="border border-gray-300 p-2 w-35">Última fecha en que se completó*</th>

                                            {/* Header for the paired columns */}
                                            {[...Array( maxAmountOfColumns )].map((_, i) => (
                                                <th key={i} className="border border-gray-300 p-2">Asignado a</th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            territoriesNumbers.map( territoryId => {
                                                const currentTerritoryGroup = activityRegistersGroupedByTerritories[territoryId]

                                                return (
                                                    <ActivityRegisterRow 
                                                        key={ territoryId }
                                                        territoryInformation={{
                                                            territoryGroup: currentTerritoryGroup,
                                                            maxLength: maxAmountOfColumns
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                        )
                    }
                </div>
            </Widget>

            <ActivityRegisterDisclaimer />

        </div>
    );
};

export default TerritoryRegistryTable