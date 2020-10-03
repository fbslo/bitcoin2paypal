# Bitcoin to PayPal exchange

---

Bitcoin to PayPal exchange is service that allows people to sell Bitcoins for PayPal (more options in future updates).

***How does it work?***

User create transaction with his email account. After he deposit Bitcoins, administrator can manually send money to user's PayPal account.
Since PayPal does not allow cryptocurrency exchange, transfer must be done manually.

User create transaction. Status of this transaction in 'UNPAID'.
After payment is received, status is changed to 'PAID'.
Administrator can change status to 'COMPLETED' in the dashboard (/admin).

***Features***

- Transaction: All transactions can be seen on the dashboard.
- Blog: Admin can create, edit and delete blog posts from dashboard.
- View count: All blog posts have live view count.
- Visitor logs: All visitors IP addresses are stored in the database.
- Reviews: Admin can add and delete reviews from the dashboard.
- Messages: Users can send messages from /contact and admin can see or delete them on the dashboard.
- Anti-Spam: Spam messages are filtered and removed.
- Affiliates: Admin can create, delete and keep track of all affiliates. New affiliate ID must be added manually.

***Installation***

Recommended operating system is Ubuntu 16.04 with 512 MB RAM, 1 GB disc, static IP.

**Install NodeJS and NPM:**

`$ sudo apt-get update`

`$ sudo apt-get install nodejs`

`$ sudo apt-get install npm`

Verify that everything is working:

`$ node -v`

`$ npm -v`

You should see the version of NodeJS and NPM.

**Install MySQL database:**

`$ sudo apt-get install mysql-server`

`$ mysql_secure_installation`

(Use secure root password and DON'T FORGET IT!)

Login into MySQL:

`$ sudo mysql -u root -p`

(Optional) Create new mysql user:

`CREATE USER 'mynewuser'@'localhost' IDENTIFIED BY 'goodPassword';`

`GRANT ALL PRIVILEGES ON * . * TO 'mynewuser'@'localhost';`

`FLUSH PRIVILEGES;`

Close mysql (ctrl+d on ubuntu terminal)

Import database file (exchange.sql):

`$ mysql -u mynewuser -p exchange < exchange.sql`

**Database setup is over, let's set up our service!**

Upload files via FTP. When you have files on your server, edit config.json file (if it's called demo_config.json, rename it)

`$ nano bitcoin2paypal/config/config.json`

```
{
  "password": "password", //admin's username (to login into /admin, username is admin)
  "api_key": "api_key", //api key, make sure it's secure
  "database_ip": "localhost",
  "database_user": "mynewuser", //mysql user you created earlier
  "database_password": "goodPassword", //password for mysql user
  "database_port": "3306",
  "database": "exchange",
  "rate": "1", //exchange rate, e.g. 1.1 = 10% above market rate, 0.9 = 10% under market rate
  "tx_number_front_page": "80", //This number will be shown on front page, "about" section. "We already have <%= tx_number %>+ transactions!"
  "callback_secret": "secret_for_callback", //secret for payment processor's callbacks
  "deposit_address": "18cCRSfB7w77BfPTdVjTgkc2n2KtNyMvJC", //all funds will be redirected to this bitcoin address
  "visit_limit": "200", //maximum number of requests from one IP in 15 minutes (stop small DDoS attacks)
  "public_api": "true", //disable or enable public API
  "environment": "production" //in 'production', you need SSL certificate, port will be 80 and 443, http will redirect to https.  'dev' will use port 5000
}
```

Save and close file (ctrl-x).

**Run the app**

`cd bitcoin2paypal`

Install dependencies:
`npm install`

Test the app.

`$ node app.js`

If everything is working, stop the node app and install PM2, so it will keep running even after you disconnect from the server (if you use VPS).

`$ npm install pm2 -g` (Install PM2 to keep process running in backround)

`$ pm2 start app.js`

***Your app is now live!***

***Production setup***

To use this app in production mode, you will need SSL keys. Store key.pem and cert.pem into /ssl directory. 

If you run this app on Windows or Linux, you should run nginx in front as a reverse proxy to app.js running on port e.g. 3000. 

(You could run it as root ( `sudo pm2 app.js start`), but this is BAD for security)

Note: `npm run dev` will start app with nodemon.

TODO:
- [ ] Add anti-spam to "create exchange" form.
