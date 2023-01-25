    _header: 'POST /v2/user/me HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'Content-Type: application/x-www-form-urlencoded\r\n' +
      'Authorization: Bearer jsRVykxa71z83wc4rqJ2iVxmBNgHZ0BuqLbhznh2CisMqAAAAYXI3UAz\r\n' +
      'User-Agent: axios/1.2.3\r\n' +
      'Accept-Encoding: gzip, compress, deflate, br\r\n' +
      'Host: kapi.kakao.com\r\n' +
      'Connection: close\r\n' +
      'Content-Length: 0\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 443,
      protocol: 'https:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype],
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 1,
      maxCachedSessions: 100,
      _sessionCache: [Object],
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'POST',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/v2/user/me',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: undefined,
      socket: [TLSSocket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [TLSSocket],
      _consuming: false,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'https://kapi.kakao.com/v2/user/me',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 20,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'kapi.kakao.com',
    protocol: 'https:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'https://kapi.kakao.com/v2/user/me',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kBytesWritten)]: 0,
    [Symbol(kEndCalled)]: true,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'content-type': [Array],
      authorization: [Array],
      'user-agent': [Array],
      'accept-encoding': [Array],
      host: [Array]
    },
    [Symbol(kUniqueHeaders)]: null

},
data: {
id: 2629024083,
connected_at: '2023-01-19T03:53:54Z',
properties: {
nickname: '백',
profile_image: 'http://k.kakaocdn.net/dn/pU17n/btrSKvGuRIC/0T6sdqDtuprBE97Rajy7xK/img_640x640.jpg',
thumbnail_image: 'http://k.kakaocdn.net/dn/pU17n/btrSKvGuRIC/0T6sdqDtuprBE97Rajy7xK/img_110x110.jpg'
},
kakao_account: {
profile_nickname_needs_agreement: false,
profile_image_needs_agreement: false,
profile: [Object],
has_age_range: true,
age_range_needs_agreement: true,
has_birthday: true,
birthday_needs_agreement: false,
birthday: '0424',
birthday_type: 'SOLAR'
}
}
}
