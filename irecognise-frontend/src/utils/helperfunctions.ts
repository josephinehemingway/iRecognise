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

export { capitalise, getBase64 };