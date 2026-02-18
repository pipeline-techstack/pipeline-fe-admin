import { PostUserResourcesPyaload } from "@/lib/types/resource-types"
import { filterPermissions } from "@/lib/utils"
import { getUserResources, postUserResources } from "@/services/resource-apis"


export const useGetResource = async() =>{
    const response = await getUserResources()
    const permissions = filterPermissions(response?.data || [])
    return {
        permissions,
        status: response?.status
    }
}

export const useSetResource = async(payload:PostUserResourcesPyaload) =>{
    const res = await postUserResources(payload)
    return res
}