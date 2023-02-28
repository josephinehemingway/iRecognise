// import {
//     CheckCircleOutlined,
//     SyncOutlined,
//     SendOutlined
// } from '@ant-design/icons'

export const DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss'

export const DANGER_STATUS = {
    NORMAL: 'Normal',
    LOW: 'Low Risk',
    MED: 'Medium Risk',
    HIGH: 'High Risk',
    CRITICAL: 'Critical Risk'
}

export const STATUS = [
    DANGER_STATUS.NORMAL,
    DANGER_STATUS.LOW,
    DANGER_STATUS.MED,
    DANGER_STATUS.HIGH,
    DANGER_STATUS.CRITICAL,
]

export const STATUS_STYLES_MAP = {
    [DANGER_STATUS.NORMAL]: {
        color: 'rgba(122,250,58,0.8)',
    },
    [DANGER_STATUS.LOW]: {
        color: 'rgba(58,205,250,0.8)',
    },
    [DANGER_STATUS.MED]: {
        color: 'rgba(250,154,58,0.8)',
    },
    [DANGER_STATUS.HIGH]: {
        color: 'rgba(250,58,58,0.8)',
    },
    [DANGER_STATUS.CRITICAL]: {
        color: 'rgba(63,58,250,0.8)',
    },
}

export const UPLOAD_S3_PREFIX = 'https://irecognise.s3-ap-southeast-1.amazonaws.com/uploads/'
export const IMAGES_S3_PREFIX = 'https://irecognise.s3-ap-southeast-1.amazonaws.com/images/suspects/'
export const S3_PREFIX = 'https://irecognise.s3-ap-southeast-1.amazonaws.com/'

export const AGE_RANGE = [
    '<21',
    '21-25',
    '26-30',
    '31-35',
    '36-40',
    '41-45',
    '46-50',
    '51-55',
    '56-60',
    '61-65',
    '>65'
]

export const GENDER = [
    'Female',
    'Male'
]

export const VIDEO_TYPE = {
    LIVE: "live",
    UPLOAD: "upload",
}