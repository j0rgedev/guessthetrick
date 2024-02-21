import {supabase} from "@/lib/supabaseClient.js";

export const getPrize = async (trickId) => {

    const { data, error } = await supabase
        .from('prize')
        .select("location_url, location_photo")
        .eq('trick_id', trickId);

    if (error) {
        throw error;
    }

    return { data };
}