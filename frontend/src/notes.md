# Notes

## Axios Error Handling

See: https://axios-http.com/docs/handling_errors.

```javascript
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

## Axios Network Error Object

```json
{
    "message": "Network Error",
    "name": "AxiosError",
    "stack": ...,
    "config": {
        ...
        "baseURL": ...,
        "method": "get",
        "url": "/api/..."
    },
    "code": "ERR_NETWORK",
    "status": null,
}
```

## Axios Bad Request Error Object

```json
{
    "message": "Request failed with status code 403",
    "name": "AxiosError",
    "stack": ...,
    "config": {
        ...
        "baseURL": ...,
        "method": "get",
        "url": "/api/..."
    },
    "code": "ERR_BAD_REQUEST",
    "status": 403,
    "request": {...},
    "response": {
        "data": {
            "detail": ...
        },
        "status": 403,
        "statusText": "Forbidden",
        "headers": {...},
        "config": {...}
    },
}
```
