function checkStatus(response) {
    if (!response.ok) {
        // (response.status < 200 || response.status > 300)
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;

}

function parseJSON(response) {
    return response.json();
}

async function callAPI(url, options) {
    try {
        let call = await fetch(url, options)
        let response = await checkStatus(call)
        let data = await parseJSON(response)
        return data
    } catch (err) {
        console.error(err)
        return new Promise((resolve) => {
            resolve({
                error: (err && err.response) ? err.response : {status: 500}
            });
        });
    }
}
/** Literal get call to api without the interaction with store
 * @param url The restful service end point.
 */
export function get(url, jwt) {
    const options = {
        method: 'GET',
        headers: {
            jwt_info_json: jwt
        }
    }
    return callAPI(url, options)
}

/** Literal post call to api without the interaction with store
 * @param url The restful service end point.
 * @param data The data to be passed in body.
 */
export function post(url, jwt, data) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            jwt_info_json: jwt
        }
    }
    return callAPI(url, options)
}

/** Literal post call to api without the interaction with store
 * @param url The restful service end point.
 * @param data The data to be passed in body.
 */
export function put(url, jwt, data) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            jwt_info_json: jwt
        }
    }
    return callAPI(url, options)
}

/** Literal delete call to api without the interaction with store
 * @param url The restful service end point.
 */
export function del(url, jwt) {
    const options = {
        method: 'Delete',
        headers: {
            jwt_info_json: jwt
        }
    }
    return callAPI(url, options)
}

export function responseJSON(response, httpRes) {
    if (response.error) {
        httpRes.status(response.error.status || 500).json(response.error)
    } else {
        httpRes.status(response.status || 200).json(response)
    }
}



