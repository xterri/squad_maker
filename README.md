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

Before we populate each squad with players, we determine how many players each squad may have (maxPlayer) and how many players in total we need (maxPlayersNeeded). In a loop, the program puts the players into alternating team (ex. player[0] = squad[0], player[1] = squad[1], player[2] = squad[2], etc.), and repeats this until we reach the maxPlayersNeeded.

Once all the players are placed, we run through a second loop to calculate the total team average and insert it into the squad array.

### Backend (NodeJS, Express, Heroku)
As mentioned above, Express was used to create the server side of the web application and deployed onto Heroku for public access. 

In the future, I would like to implment a file upload function and handle storing and pulling it to and from a Firebase Database. 


### To Do / Improve on List
* Improve / Fix the sortBy function to sort all values (+/-) from closest to furthest to zero
* [EXTRA] Implement file upload and save it to a database (firebase)
