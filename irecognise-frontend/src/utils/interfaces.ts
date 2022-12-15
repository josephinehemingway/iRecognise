interface BlacklistApi{
    suspectId?: number,
    name: string,
    age: string,
    gender: string,
    status: string,
    description: string,
    last_seen_location: string,
    last_seen_timestamp: string,
    last_modified?: string,
    created_at?: string,
}

export type { BlacklistApi }