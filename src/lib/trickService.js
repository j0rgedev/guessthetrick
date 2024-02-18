import {supabase} from "@/lib/supabaseClient.js";

export const getTrick = async () => {
    const { data, error } = await supabase
        .from('trick')
        .select("id, video_url")
        .eq('flg_active', true);

    if (error) {
        throw error;
    }

    return { data };
}

export const guessTrick = async (trickId, guess) => {
    const { data, error } = await supabase
        .from('trick')
        .select('id')
        .eq('id', trickId)
        .ilike('name', guess)

    if (error) {
        throw error;
    }

    return { winner: data.length > 0 };
};