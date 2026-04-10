import { updateCampaignOwner } from "@/services/campaign-apis"

export const useCampaignNotification = () => {
    try {
        const updateOwner = async (id: string, ownerName: string) => {
            return await updateCampaignOwner(id, ownerName);
        };
        return { updateOwner };
    } catch (error) {
        console.error("Error in useCampaignNotification:", error);
        throw error;
    }   
}