
import { Widget } from "@/components/Widget/Widget";
import { UserCreateForm } from "../components/UserCreateForm";
import { UsersList } from "../components/UsersList";


export const metadata = {
    title: 'Crear usuario',
    description: 'Página para crear un nuevo usuario de la congregación.',
};

export default async function UserProfilePage() {

    return (
        <div className="mx-auto">
            <h1 className="text-5xl font-bold mb-8">Administración de usuarios</h1>

            <div className="grid grid-cols-1 gap-8">
                <div className="">
                    <Widget title="Crear un nuevo usuario" type="default">
                        <UserCreateForm />
                    </Widget>
                </div>

                <div className="">
                    <Widget title="Usuarios activos" type="default">
                        <UsersList />
                    </Widget>
                </div>
            </div>
            
        </div>
    );
}