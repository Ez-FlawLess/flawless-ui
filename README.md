# FLAWLESS-UI

FlawLess UI is a react Library build to make developing a perfect UI easy

## Installation

Install the package from [npm](https://www.npmjs.com/package/flawless-ui).

```bash
npm i flawless-ui
```

FlawLess UI uses [axios](https://www.npmjs.com/package/axios) for listening to http requests

```bash
npm i axios
```

## Usage

First create an axios instance. ([axios docs for creating an instance](https://www.npmjs.com/package/axios#creating-an-instance))

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

[1]: https://www.npmjs.com/package/flawless-ui#FlawLessUI


### ```<FlawLessUI />```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
