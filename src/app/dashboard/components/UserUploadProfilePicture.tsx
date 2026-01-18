import { useUploadThing } from "@/utils/uploadthing"
import { useRouter } from "next/navigation";

interface Props {
    id: string
}

export const UserUploadProfilePicture = ({ id }: Props) => {

    const router = useRouter()

    const { startUpload, isUploading } = useUploadThing("profilePicture", {
        onClientUploadComplete(res) {
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
        
    )
}
