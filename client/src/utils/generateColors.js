export  const generateColors = (length) => {
    return Array.from({ length }, (_, i) => `hsl(${(i * 360) / length}, 70%, 60%)`);
};