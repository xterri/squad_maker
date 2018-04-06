# Squad Maker
The objective of this project is to create a balanced 'X' number of teams, based on the given (json) list of players. 
The challenge expects that we try to keep each team balanced in overall skills of its players.

See more information about the challenge at [Squad Maker Challenge](https://github.com/darryl-mccool/squad-maker). 

## Built With
* Node.Js
* Express
* Heroku
* EJS
* HTML, CSS, Bootstrap

### Demo
Check out demo hosted on Heroku platform: 
[Squad Maker](https://squadmaker.herokuapp.com/)

## How It Works
A brief run down of how everything was built, what and why I used some tools and how it works.

### Frontend (HTML, CSS, Bootstrap, EJS)
Using Express to create the server side of the web application. The server listens for the "GET" or "POST" requests and responds accordingly, whether it be filling variables with certain values or running a function/program to get the results.

The page is largely designed in HTML with Bootstrap but uses EJS as the 'view-engine'. I chose to use EJS because of how similar it is to HTML, but also because I was able to implement some inline codes to handle some of the data being passed into it.

I used Bootstrap to handle the responsiveness of the web application, so it will also be accessible and look decently on mobile. 
One issue is that the table may sometimes shrink and cause some misalignments with the text and table, but if one turns their phone sideways to view it, it should be fine.

### Algorithm
The approach I took for this was to calculate each player's total skills in all categories and tallied them all together to find the total skill average of all players on the waitlist.

I used that and subtracted the player's average with the total skill average to get the mean distance between each one. Then I sorted the average by closest to furthest from zero.

With the list sorted, we use the number of squads (squadNbr) the user requested and take X (squadNbr) of players from the top of our list and put them on their own teams, afterwards the program goes down the list and puts a player on a team. 
Once the loop reaches the end of the number of squads we need to populate and there are still more players on the list, the loop will reset the squad number and continue placing players on teams until it reaches the end or the maximum numbers of players needed (calculated by # of players / squadNbr)

Once all the players are placed, we run through a second code to calculate the total team average and insert it into the squad array.

### Backend (NodeJS, Express, Heroku)
As mentioned above, Express was used to create the server side of the web application and deployed onto Heroku for public access. 

In the future, I would like to implment a file upload function and handle storing and pulling it to and from a Firebase Database. 


### To Do / Improve on List
* Fix the make teams code to alternate between players being placed on teams
* Improve on optimization / complexity time (Find alternate solution to getting players averages without using two O(n^2) loops)
* [EXTRA] Implement file upload and save it to a database (firebase)
