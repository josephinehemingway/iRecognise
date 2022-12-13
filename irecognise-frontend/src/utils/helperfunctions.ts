const capitalise = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

export { capitalise };