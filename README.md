# NCKU_Web_Login_Dinosaur

## Step 0: Set up
```
$ npm i
```
## Step 1: Compile pug and sass
* Compile `./app/login.pug` to `./dist/login.html`

  ```
  $ ./node_modules/.bin/pug ./app/login.pug -o ./dist/ -P
  ```
  
   `-P`: For better view of html<br>
   `-P`: 讓編譯出來的html自動排版
* Compile `./app/login.sass` to `./dist/login.css`

  ```
  $ ./node_modules/.bin/node-sass ./app/login.sass -o dist
  ```
* Compile `./app/login.ts` to `./dist/log.js`

  ```
    $ ./node_modules/.bin/babel ./app/login.ts -o ./dist/log.js --extensions ".ts"
  ```
  
## Step2: Start server
```
$ node ./ser.js
```
View our web on [Here!](http://luffy.ee.ncku.edu.tw:7888/login.html)

## Troubleshooting
In Step2, if the **address is already in use**,
it might be someone else is using the port.<br>
Try to change the port number in `./ser/js`,
and view the web on http://luffy.ee.ncku.edu.tw:[PORT]/login.html.<br>
The [PORT] should be replaced by the port number you entered.
