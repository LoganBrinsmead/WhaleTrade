/**
 * get url from window url
 * @returns {*}
 */
export const getApiURL = () => {
    const apiURL = new URL(window.location.href);
    if (process.env.NODE_ENV !== 'production') {
        console.log("Using dev port")
        // apiURL.port = process.env.REACT_APP_DEV_PORT;
        apiURL.port = 9000;
        console.log(apiURL.href)
    }
    // else api is running on same port as ui
    return apiURL;
}