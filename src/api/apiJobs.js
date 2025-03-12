import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, search }) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

    if (location)
        query = query.eq("location", location);
    if (company_id)
        query = query.eq("company_id", company_id);
    if (search)
        query = query.ilike("title", `%${search}`);

    const { data, error } = await query;
    if (error) {
        console.error("Error Fetching Jobs:", error);
        return null;
    }

    return data;
}