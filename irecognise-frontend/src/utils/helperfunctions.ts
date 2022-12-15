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


export { capitalise };