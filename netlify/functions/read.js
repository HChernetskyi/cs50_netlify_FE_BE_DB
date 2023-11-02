import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

exports.handler = async function readFromDb(event, context) {
    const { identity, user } = context.clientContext;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    // Do stuff and return a response...
    
    

    if (user & supabaseKey & supabaseUrl) {
        const _supabase = createClient(supabaseUrl, supabaseKey);
        var { data, error } = await _supabase.from('jobs').select();
        return data;
    }
};