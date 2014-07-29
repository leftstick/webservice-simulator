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

#### Figure1 ####
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

#### Figure2 ####
```JavaScript
{
    "when": "/hello",
    "method": "all",
    "responseFile": "data01"
}
```

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| when | string | Yes | the `path` the Router |
| method | string | Yes | the `VERB` supported by `express`.(For example: `get`, `post`, `put`, `update`, `delete`, `all`) |
| responseData | object | No |  | the data will be sent to client as response content
| responseFile | string | No | a file name without extension in which you have the response data in it |

Note:
> `responseData` has higher priority than `responseFile`, which means, `responseData` will be used while you have both `responseData` and `responseFile` in the route configuration file
> Either `responseData` or `responseFile` has be be set in route configuration file