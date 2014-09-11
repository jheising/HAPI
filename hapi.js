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

hapi.makeHAPIFailure = function (why, apiErrorCode) {
    var hapiResponse = {
        "this": "failed",
        "with": apiErrorCode,
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

        res.sendHAPIFailure = function(why, apiErrorCode)
        {
            res.send(hapi.makeHAPIFailure(why, apiErrorCode));
        }

        res.sendHAPINotFoundFailure = function()
        {
            res.sendHAPIFailure("we couldn't find this", 404);
        }

        return (next());
    }

    return (hapiMiddleware);
}

hapi.middleware = middleware;

module.exports = hapi;
