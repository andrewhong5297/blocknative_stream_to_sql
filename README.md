## Getting Started

Make sure to use this repo as a template, click that big green button at the top right.

1. Create a subscription and filters in mempool explorer for the addresses you want to track. The [docs](https://docs.blocknative.com/mempool-explorer) explain filters well (careful about specific versus global)
2. Setup your sqlite db or whatever other preferred data storage you want with express (backend.js). You will need a POST endpoint later for the mempool to stream data to, have it just console.log(req.body) for now.
3. Add in ngrok to your express app, make sure to run [ngrok authtoken <token>](https://dashboard.ngrok.com/get-started/setup) **before** you run `node server/backend.js`.
4. Start up your ngrok + express server with `node server/backend.js`
5. Go to your [local ngrok dashboard](http://127.0.0.1:4040/inspect/http) and copy the https link.
6. Then go to blocknative accounts page and use that link (**and be sure to add the POST endpoint to the end of the link**) to create a webhook following this [gif tutorial](https://cdn.discordapp.com/attachments/871103550414016612/871109785070747728/Kapture_2021-07-31_at_15.14.15.gif). Instead of the address added in the tutorial, add whichever address you want to track. This should match with the ones you already created subscriptions and filters for in step 1.
7. Use newest db explorer for sqlite [here](https://sqlitebrowser.org/blog/version-3-12-2-released/) and check the sqlite db to see if everything is working (for me that was running `SELECT * FROM artblocks_mints`). You will need to adjust the CREATE and INSERT statements for the variables you want to parse from the POST request.
8. ???
9. profit

If you have any issues with the connection, use the inspect tab of the ngrok dashboard to see what is going wrong. Feel free to open any issues or dm me on twitter (same username) if you have any questions.
