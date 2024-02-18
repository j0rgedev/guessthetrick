import {supabase} from "@/lib/supabaseClient.js";

export const getPrize = async () => {

    const { data, error } = await supabase
        .from('prize')
        .select("location_url");

    if (error) {
        throw error;
    }

    return { data };
}