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

interface StreamsApi {
    _id: number,
    stream_name: string,
    location: string,
    created_at: string,
}

interface UploadsApi {
    videoId?: number,
    video_name: string,
    description: string,
    location: string,
    created_at: string,
}

export type { BlacklistApi, StreamsApi, UploadsApi }