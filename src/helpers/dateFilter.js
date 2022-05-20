export const getLocaleDateBR = (date) => {
    return new Date(date).toLocaleString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    })
}

export const formatStringDate = (date) => {
    var day  = date.split("/")[0];
    var month  = date.split("/")[1];
    var year  = date.split("/")[2];
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
}