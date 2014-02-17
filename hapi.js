var hapi = {};

hapi.HAPI_VERB = {
    get: "getting",
    create: "creating",
    update: "changing",
    delete: "deleting"
};

hapi.makeHAPISuccess = function (HAPI_VERB, resourceType, data) {
    var hapiResponse = {
        "this": "succeeded",
        "by": HAPI_VERB,
        "the": resourceType,
        "with": data
    };

    return hapiResponse;
}

hapi.makeHAPIFailure = function (why, httpErrorCode, apiErrorCode) {
    httpErrorCode = httpErrorCode || 500;

    var hapiResponse = {
        "this": "failed",
        "with": apiErrorCode || httpErrorCode,
        "because": why
    };

    return hapiResponse;
}

function middleware()
{
    function hapiMiddleware(req, res, next) {
        res.sendHAPISuccess = function(HAPI_VERB, resourceType, data)
        {
            res.send(hapi.makeHAPISuccess(HAPI_VERB, resourceType, data));
        }

        res.sendHAPIFailure = function(why, httpErrorCode, apiErrorCode)
        {
            res.send(hapi.makeHAPIFailure(why, httpErrorCode, apiErrorCode));
        }

        res.sendHAPINotFoundFailure = function()
        {
            res.sendHAPIFailure("we couldn't find this", 404, 404);
        }

        return (next());
    }

    return (hapiMiddleware);
}

hapi.middleware = middleware;

module.exports = hapi;
