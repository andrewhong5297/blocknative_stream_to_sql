## Getting Started

1. create a subscription and filters in mempool explorer, then download the config json file. The [docs](https://docs.blocknative.com/mempool-explorer) explain this well.
2. setup a webhook url [here](https://webhook.site/#!/758be919-6f7a-4fa2-b22c-bef2290165ee) then go to blocknative accounts page and create a ws
3. setup your sqlite db or whatever other preferred data storage you want with express (dbstuff.js)
4. setup your blocknative connection and event listener/handler which should POST to dbstuff.js endpoint 8000
5. ???
6. profit

---

## To query:

use newest db explorer for sqlite [here](https://sqlitebrowser.org/blog/version-3-12-2-released/)

## To test:

```
node server/dbstuff.js
```

```
node runner/memstuff.js
```
