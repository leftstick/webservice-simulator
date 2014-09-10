## How to write route configuration file ##

### Create `json` file under `routerDir` ###

<pre>
example
      |--data
            |--data01.json
      |--routers
                |--HelloWorld.json
                |--DataFile.json
                ......
</pre>

### Route configuration file structure ###

#### Simple mock for all http method ####
```JavaScript
{
    "when": "/hello",
    "method": "all",
    "responseData": {
        "title": "hello",
        "content": "world, i am your uncle"
    }
}
```

#### Simple mock for responding from a datafile ####
```JavaScript
{
    "when": "/datafile",
    "method": "all",
    "responseFile": "data01"
}
```

> `data01` indicates a `data01.json` placed under `data` folder which besides `routers` directory.

#### Simple mock for websocket requirements ####
```JavaScript
{
    "type": "ws",
    "when": "/askfordata",
    "interval": 3000,
    "responseData":{
        "isDirty": true
    }
}
```

> This create an websocket listener for specified `when`, and send message to client every `interval` millisecond


| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| type | string | No | `http` or `ws`. `http` is used as default |
| when | string | Yes | the `path` the Router |
| method | string | No | the `VERB` supported by `express`.(For example: `get`, `post`, `put`, `update`, `delete`, `all`). Only required in `http` type |
| interval | int | No | the frequency used in `ws` type |
| responseData | object | No |  | the data will be sent to client as response content
| responseFile | string | No | a file name without extension in which you have the response data in it |

Note:
> `responseData` has higher priority than `responseFile`, which means, `responseData` will be used while you have both `responseData` and `responseFile` in the route configuration file
> Either `responseData` or `responseFile` has be be set in route configuration file