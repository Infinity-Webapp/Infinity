# Infinity
The webapp is a demonstration to a chatting system.

 # requirements
 - knowledge of
   - HTML, CSS, JS
   - NODE.JS
   - express.js & passport.js
 microsoft visual studio code is recommended

# Starting the app
      Step 1
      - Open shell in root directory.
      Step 2
      - type "npm run check".
      Step 3
      - Open shell in random-chat-server directory.
      Step 4
      - type "npm run test"
* all your servers must be started, now you can start devloping the app

# Technologies used:

* Main Server 
   - Node.js, express.
   - passport.js for login system ( Local Strategy )
   - express flash for error messages
* Random Chat Server
   - Socket.io
       
* Homepage
   - HTML 
   - tailwind.css 
   - custom css for customisation in tailwind
* Secondary Pages
   - ejs 
   - tailwind.css 
   - custom css for customisation in tailwind
   - JS in required pages.

* Media files
   - divided in 3 types 
     - icons
     - images
     - videos


# The environment variables file is not included in the repository. You must create a .env file in the root directory and add your secret key to it :

          Step 1
          - create '.env file' in the root directory.
          Step 2
          - create 'SESSION_SECRET' variable in the file.
          Step 3 
          - add your secret key in the variable " SESSION_SECRET='secret' ".
