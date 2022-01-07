# FLAWLESS-UI

FlawLess UI is a react Library build to make developing a perfect UI easy

## Installation

Install the package from [npm](https://www.npmjs.com/).

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
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
