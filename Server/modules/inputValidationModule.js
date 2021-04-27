

// Check for a cross-site scripting malicious input
function checkAlphanumeric(data, field='') {
    const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#/\\- ";
    for (let char of data) {
        if (!whitelist.includes(char)) {
            throw new Error(field);
        }
    }
    return data;
}

function checkNumeric(data, field='') {
    const whitelist = "0123456789-";
    for (let char of data) {
        if (!whitelist.includes(char))
            throw new Error(field);
    }
    return data;
}

function checkState(data, field='') {
    const stateAbbreviations = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA',
        'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
        'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX',
        'UT','VT','VA','WA','WV','WI','WY'
    ];
    if (!stateAbbreviations.includes(data))
        throw new Error(field);
    return data;
}

module.exports = {checkAlphanumeric, checkNumeric, checkState};