export function success(body) {
    return buildResponse(200, body);
}

export function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Amz-Security-Token',
        "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}