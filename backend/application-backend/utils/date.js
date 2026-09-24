export const calculateExpiry = (hours) => {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
};

export const isExpired = (expiresAt) => {
    return Date.now() > new Date(expiresAt).getTime();
};