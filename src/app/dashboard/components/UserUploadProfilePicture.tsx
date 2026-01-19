import { useUploadThing } from "@/utils/uploadthing"
import { useRouter } from "next/navigation";
import { IoCameraOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import style from './UserUploadProfilePicture.module.css'

interface Props {
    id: string
}

export const UserUploadProfilePicture = ({ id }: Props) => {

    const router = useRouter()

    const { startUpload, isUploading } = useUploadThing("profilePicture", {
        onClientUploadComplete: async (res) => {
            await fetch(`/api/user/profile-picture/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: res[0].ufsUrl })
            })
            router.refresh()
        },
        onUploadError: (error: Error) => {
            // Do something with the error.
            throw new Error(`ERROR! ${error.message}`);
        }
    });

    return (
        <label className="absolute bottom-0 w-10 h-10 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors flex justify-center items-center">
            <span className="text-white text-xs">
                {
                    isUploading 
                        ? (
                            <LuLoaderCircle className={`text-teal-500 ${style.spinner}`} size={25} />
                        )
                        : (
                            <IoCameraOutline className="text-teal-500" size={25} />
                        )
                }
            </span>
            <input 
                type="file" 
                className="hidden" 
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) await startUpload([file]);
                }}
            />
        </label>
    )
}
