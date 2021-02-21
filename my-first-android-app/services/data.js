async function getData() {
    try {
    let response = await fetch(
    'https://epistat.sciensano.be/Data/COVID19BE.xlsx',
    );
    let responseJson = await response.json();
    console.log(responseJSon);
    return responseJson;
    } catch (error) {
    console.error(error);
    }
    }