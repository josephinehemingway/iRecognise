import type { RcFile } from 'antd/es/upload';

const capitalise = (text: string | undefined) => {
    if (text === undefined) {
        return 'Text undefined'
    }

    if (text.split(" ").length > 1) {
        const arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }
        return arr.join(" ");
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

const checkVideoPath = (path: string, login: string | undefined, pw: string | undefined) => {
    if (path === 'webcam' || path === 'Webcam' || path === '0') {
        // for webcam stream
        return path
    }
    else if (path.includes(':')) {
        // this is an ip address
        if (login === undefined || pw === undefined || login === '' || pw === '') {
            return `https://${path}/video`
        } else {
            // with login and pw
            return `https://${login}:${pw}@${path}/video`
        }
    }
}


export { capitalise, getBase64, checkVideoPath };