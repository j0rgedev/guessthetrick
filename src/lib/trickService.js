import {supabase} from "@/lib/supabaseClient.js";

export const getTrick = async () => {
    try {
        const {data, error} = await supabase
            .from('trick')
            .select("id, video_url", );

        if (error) {
            return { error };
        }

        return { data };

    } catch (error) {
        return { error };
    }
}

export const guessTrick = async (trickId, guess) => {
    try {
        const { data, error } = await supabase
            .from('trick')
            .select('id')
            .eq('id', trickId)
            .ilike('name', guess)

        if (error) {
            return { error };
        }

        return { winner: data.length > 0 };

    } catch (error) {
        return { error };
    }
};