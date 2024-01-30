import {supabase} from "@/lib/supabaseClient.js";

export const getPrize = async () => {
    try {
        const {data, error} = await supabase
            .from('prize')
            .select("location_url");

        if (error) {
            return { error };
        }

        return { data };

    } catch (error) {
        return { error };
    }
}