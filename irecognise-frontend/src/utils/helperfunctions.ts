const capitalise = (status: string | undefined) => {
    if (status === undefined) {
        return 'Status undefined'
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
}

export { capitalise };