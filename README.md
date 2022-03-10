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
})

export default instance
```

After that you can pass the axios instance to the ```<FlawLessUI />``` component and use the library features.

```javascript
import { FlawLessUI } from 'flawless-ui'
import instance from './api'

ReactDOM.render(
  <FlawLessUI axiosInstance={instance}>
    <App />
  </FlawLessUI>,
  document.getElementById('root')
)
```

## Features

- [Loading][1]
- [Http Feedback][2]

[1]: https://www.npmjs.com/package/flawless-ui#loading
[2]: https://www.npmjs.com/package/flawless-ui#http-Feedback

## Loading

First make sure you have created an axois instance and passed it to the ```<FlawLessUI />``` component. [Guide](https://www.npmjs.com/package/flawless-ui#usage)

After that you can use ```<LoadingController />``` inside your app to track loading state.

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

## HTTP Feedback

First make sure you have created an axois instance and passed it to the ```<FlawLessUI />``` component. [Guide](https://www.npmjs.com/package/flawless-ui#usage)

You can use any component you want to show your feedback. In order to do that you'll need to passing that component to component prop in ```<FlawLessUI />```. You can do this in a number of ways.

```javascript
import { FlawLessUI, IComponents, IAlert } from 'flawless-ui'
import React, { FC } from 'react';
import instance from './api'

const Alert: FC<{type: 'success' | 'error'} & IAlert> = ({
  title,
  message,
  type,
  onClose,
}) => {
  return (
    <div style={{background: type === 'success' ? 'green' : 'red'}}>
      title {title} message {message}
      <button onClick={onClose}>
        close
      </button>
    </div>
  )
}

const components: IComponents = {
  alerts: {
    success: (props: IAlert) => <Alert {...props} type='success' />,
    error: ({title, message, onClose}: {title?: string, message: string, onClose?: () => any}) => <Alert title={title} message={message} onClose={onClose} type='error' />,
  }
}

ReactDOM.render(
  <FlawLessUI 
    axiosInstance={instance}
    components={components}
   >
    <App />
  </FlawLessUI>,
  document.getElementById('root')
)

```

After that you can use the ```<HttpFeedback />``` component to show the Alerts components for feedback.

```javascript
import { HttpFeedback } from 'flawless-ui'

import instance from 'api'

const URL = '/api-path'

const ExampleComponent = () => {

  useEffect(() => {
    instance.get(URL)
  }, [])

  return (
    <HttpFeedback 
        url={URL} 
     />
  )
}
```

By default ```<HttpFeedback />``` only applies to Post, Patch, Put and Delete method requests. you can change this by giving an array of methods to the ```feedbackMethods```  prop on ```<FlawLessUI />```.

```javascript
type HttpMethod = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch'

const feedbackMethods: HttpMethod[] = ['post', 'patch', 'put', 'delete']
```

The title and message in ```<HttpFeedback />``` come from the IStatusCodeMessages object which has a static title and message for respond status codes. You can change these values by passing an object of type ```IStatusCodeMessages``` to ```statusCodeMessages``` prop on ```<FlawLessUI />```. you can also a function to ```error.message``` in ```statusCodeMessages``` which gets the http respond and passes it to the function as prop. If the function returns a value it would be shown to the user but if not it will show the message saved for the status code.

<!-- ## Components

- [```<FlawLessUI />```][1]
- [```<LoadingController />```][2]

[1]: https://www.npmjs.com/package/flawless-ui#flawlessui-
[2]: https://www.npmjs.com/package/flawless-ui#loadingcontroller-


### ```<FlawLessUI />```

props:
- ```axiosInstance```: an object of type AxiosInstance.
- ```onConfig``` (optional): an event called when an HTTP request is being made with the config parameter of type AxiosRequestConfig.
- ```onRequestError``` (optional): an event called when an HTTP request throws an error with the error parameter of type any.
- ```onResponseError``` (optional): an event called when an HTTP response throws an error with the error parameter of type any.
- ```onResponse``` (optional): an event called when an HTTP response has a success status code with the response parameter of type AxiosResponse.

### ```<LoadingController />```

props:
- ```children```: a function with the loading boolean as parameter that should return JSX code.
- ```url```: a string that has been passed to the axios instance as path for HTTP request. -->

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
