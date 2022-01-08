# FLAWLESS-UI

FlawLess UI is a react Library build to make developing a perfect UI easy

## Installation

Install the package from [npm](https://www.npmjs.com/package/flawless-ui).

```bash
npm i flawless-ui
```

FlawLess UI uses <a href="https://www.npmjs.com/package/axios" target="_blank">axios</a>

```bash
npm i axios
```

## Usage

First create an axios instance. <a href="https://www.npmjs.com/package/axios#creating-an-instance" target="_blank">axios docs for creating an instance</a>

```javascript

import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
)}

export default instance
```

FlawLess UI includes ```<FlawLessUI />``` component, which handles loading state and provides it to the rest of the app.

```javascript
import { FlawLessUI } from 'flawless-ui'
import instance from './api'

ReactDOM.render(
  <FlawLessUI axiosInstance={instance}>
    <App />
  </FlawLessUI>,
  document.getElementById('root')
);
```

You can use ```<LoadingController />``` inside your app now to track loading state.

```javascript
import { LoadingController } from 'flawless-ui'

import instance from 'api'

const URL = '/api-path'

const ExampleComponent = () => {

  useEffect(() => {
    instance.get(URL)
  }, [])

  return (
    <LoadingController url={URL}>
      {loading => (
          <h1>
            {loading ? 'isLoading' : 'notLoading'}
          </h1>
      )}
    </LoadingController>
  )
}
```


## Components

- [```<FlawLessUI />```][1]
- [```<LoadingController />```][2]

[1]: https://github.com/Ez-FlawLess/flawless-ui#FlawLessUI
[2]: https://github.com/Ez-FlawLess/flawless-ui#LoadingController


### ```<FlawLessUI />```

props:
- axiosInstance: an object of type AxiosInstance.
- onConfig (optional): an event called when an HTTP request is being made with the config parameter of type AxiosRequestConfig.
- onRequestError (optional): an event called when an HTTP request throws an error with the error parameter of type any.
- onResponseError (optional): an event called when an HTTP response throws an error with the error parameter of type any.
- onResponse (optional): an event called when an HTTP response has a success status code with the response parameter of type AxiosResponse.

### ```<LoadingController />```

props:
- children: a function with the loading boolean as parameter that should return JSX code.
- url: a string that has been passed to the axios instance as path for HTTP request.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
