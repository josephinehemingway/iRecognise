import type { RcFile } from 'antd/es/upload';

const capitalise = (status: string | undefined) => {
    if (status === undefined) {
        return 'Status undefined'
    }

    if (status.split(" ").length > 1) {
        const arr = status.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }
        return arr.join(" ");
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
}

const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export { capitalise, getBase64 };