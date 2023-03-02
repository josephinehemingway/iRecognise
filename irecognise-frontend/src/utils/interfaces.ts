interface UserApi{
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string
    created_at?: string,
}

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
    streamId?: number,
    stream_name: string,
    ip: string,
    login: string,
    pw: string,
    location: string,
    created_at: string,
}

interface UploadsApi {
    videoId?: number,
    video_name: string,
    description: string,
    location: string,
    date: string,
    url_path: string,
    created_at: string,
}

interface HistoryApi {
    _id: string;
    suspectId: number;
    timestamp: string;
    similarity: string;
    camera: string;
    location: string;
    video_url: string;
    face_url: string;
}

interface HistoryTable {
    key: string;
    timestamp: string;
    camera: string;
    location: string;
    similarity: string;
    playback: string;
}

interface DetectionInterface {
    key: string;
    id: string;
    timestamp: string;
    identity: string;
    similarity: string;
}

interface filter {
    text: string;
    value: string
}

export type { UserApi, BlacklistApi, StreamsApi, UploadsApi, HistoryTable, DetectionInterface, HistoryApi, filter }