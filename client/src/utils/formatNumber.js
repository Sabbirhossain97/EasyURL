export const formatNumber = (value) => {
    return !isNaN(value) && value !== null && value !== undefined ? Math.round(value) : 0;
};