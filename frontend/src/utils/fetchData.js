function getSuspender(promise) {
    // console.log("Entró al getSuspender");
    let status = "pending";
    let response;
    const suspender = promise.then(
        (res) => {
            status = 'success';
            response = res;
        },
        (err) => {
            status = 'error';
            response = err;
        }
    );

    const read = () => {
        switch(status) {
            case 'pending':
                throw suspender;
            case 'error':
                throw response;
            default:
                return response;
        }
    }
    // console.log(read);
    return { read }
}

export function fetchData(url, options) {
    const promise = fetch(url, options)
        .then((response) => response.json())
        .then((json) => json)
    
    return getSuspender(promise)
}

// Pasando a async ... await:
export const fetchDataUncommon = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        return getSuspender(jsonResponse);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}