

export const getSlug = name => {
    return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(" ")
    .join("-");    
} 