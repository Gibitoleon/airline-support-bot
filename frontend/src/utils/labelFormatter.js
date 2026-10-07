const formatLabel = (value) => {
    return value
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default formatLabel;