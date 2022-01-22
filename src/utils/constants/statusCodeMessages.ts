export interface IStatusCodeMessage {
    title: string,
    message: string,
}

export interface IStatusCodeMessages {
    1: {
        title?: string,
        message: string | {
            100: string | IStatusCodeMessage,
            101: string | IStatusCodeMessage,
            103: string | IStatusCodeMessage,
        }
    },
    2: {
        title?: string,
        message: string | {
            200: string | IStatusCodeMessage,
            201: string | IStatusCodeMessage,
            202: string | IStatusCodeMessage,
            203: string | IStatusCodeMessage,
            204: string | IStatusCodeMessage,
            205: string | IStatusCodeMessage,
            206: string | IStatusCodeMessage,
        }
    },
    3: {
        title?: string,
        message: string | {
            300: string | IStatusCodeMessage,
            301: string | IStatusCodeMessage,
            302: string | IStatusCodeMessage,
            303: string | IStatusCodeMessage,
            304: string | IStatusCodeMessage,
            306: string | IStatusCodeMessage,
            307: string | IStatusCodeMessage,
            308: string | IStatusCodeMessage,
        }
    },
    4: {
        title?: string,
        message: string | {
            400: string | IStatusCodeMessage,
            401: string | IStatusCodeMessage,
            402: string | IStatusCodeMessage,
            403: string | IStatusCodeMessage,
            404: string | IStatusCodeMessage,
            405: string | IStatusCodeMessage,
            406: string | IStatusCodeMessage,
            407: string | IStatusCodeMessage,
            408: string | IStatusCodeMessage,
            409: string | IStatusCodeMessage,
            410: string | IStatusCodeMessage,
            411: string | IStatusCodeMessage,
            412: string | IStatusCodeMessage,
            413: string | IStatusCodeMessage,
            414: string | IStatusCodeMessage,
            415: string | IStatusCodeMessage,
            416: string | IStatusCodeMessage,
            417: string | IStatusCodeMessage,
        }
    },
    5: {
        title?: string,
        message: string | {
            500: string | IStatusCodeMessage,
            501: string | IStatusCodeMessage,
            502: string | IStatusCodeMessage,
            503: string | IStatusCodeMessage,
            504: string | IStatusCodeMessage,
            505: string | IStatusCodeMessage,
            511: string | IStatusCodeMessage,
        }
    }
}

export const statusCodeMessages: IStatusCodeMessages = {
    1: {
        title: 'Information',
        message: {
            100: 'Continue',
            101: 'Switching Protocols',
            103: 'Checkpoint',
        }
    },
    2: {
        title: 'Successful',
        message: {
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            203: 'Non-Authoritative Information',
            204: 'No Content',
            205: 'Reset Content',
            206: 'Partial Content',
        }
    },
    3: {
        title: 'Redirection',
        message: {
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            306: 'Switch Proxy',
            307: 'Temporary Redirect',
            308: 'Resume Incomplete',
        }
    },
    4: {
        title: 'Client Error',
        message: {
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Request Entity Too Large',
            414: 'Request-URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Requested Range Not Satisfiable',
            417: 'Expectation Failed',
        }
    },
    5: {
        title: 'Server Error',
        message: {
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            511: 'Network Authentication Required',
        }
    }
}