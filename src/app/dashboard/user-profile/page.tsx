
import { Widget } from "@/components/Widget/Widget";
import { UserInformation } from "../components/UserInformation";
import { UserUpdateForm } from "../components/UserUpdateForm";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { formatUserRole } from "@/helpers/formatUserRole";
import { profileMockData } from "@/data/profileMockData";
import { User } from "@/types/user";

export default async function UserProfilePage() {

    const user: User = await getUserByActiveSession()

    console.log( user )

    return (
        <div className="mx-auto">
            <h1 className="text-5xl font-bold mb-8">Mi Perfil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Visual information */}
                <div className="lg:col-span-1">
                    <Widget title="Usuario" type="primary">
                        <UserInformation 
                            image={ user.image || profileMockData.profileImage }
                            name={ user.name }
                            role={ formatUserRole( user.role ) }
                            id={ user.id }
                        />
                    </Widget>
                </div>

                {/* Edit user data */}
                <div className="lg:col-span-3">
                    <Widget title="Editar Información" type="default">
                        <UserUpdateForm
                            email={ user.email }
                            id={ user.id }
                        />
                    </Widget>
                </div>

            </div>
        </div>
    );
}