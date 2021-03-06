# nfl-clientside

I built this site to track an NFL league I ran for friends for the 2019 NFL Seasons. This site no longer works because the NFL killed their APIs (also the season is over).

This was one of the first sites I hacked together as I was learning JavaScript. I used arrays for ***everything***, `XMLHttpRequest`, `var`, and packed everything into a single JavaScript file. I've learned **a lot** since.

Checkout the [new version](https://github.com/TylerAuer/nfl-wins-losses) built with TypeScript, React, and Express.

## Old Notes from when I Originally Built This

### What I Learned

- Git and Github
- Accessing and parsing JSON and XML files through an API
- Using vanilla JavaScript to modify HTML DOM
- Looping functions on delay (for my API calls)
- Changing the DOM without visible flashing/changes
- Different types of `for` loops
  - `for...of`
  - `for...in`
  - `forEach`
- JavaScript Date object
- Difference between JavaScripts and Python variable scopes -- particularly that control flow statements (`if`, `for`, etc.) do not limit a variable's scope in JavaScript -- when using `var` declarations

### What I Would Change

- Better safeguards for unsuccessful API calls
- Have `.js` file follow norms for organization, commenting, etc.
- Have the scorecards order themselves logically instead of in the order they are listed in the API
- Make use of features from ECMAScript 6
- `const` and `let` instead of `var` where appropriate

### API Information

I used two different NFL APIs to build this site:

1. **_XML_** - <http://www.nfl.com/feeds-rs/standings/2019/REG>

   This feed updates within about 5 minute of the end of a game. It contains many details including:

   - wins, losses, and ties

   - week number (updates Thu. AM)

   - _Note that it uses JAC for Jacksonville instead of JAX_

2. **_JSON_** - <https://feeds.nfl.com/feeds-rs/scores.json>

   This feed updates in real-time (or at least live with my DirecTV streaming) as games are progressing. I used a [Python script](https://github.com/TylerAuer/nfl-clientside/blob/master/api_downloader.py) to download APIs on two different Sundays to better understand the structure of the JSON data. You might use [them](https://github.com/TylerAuer/nfl-clientside/tree/master/APIs) to help since the NFL has no documentation for this API.

   One important detail is that the games have a few different states:

   - `'PREGAME'`

   - `'HALFTIME'`

   - `'FINAL'` and `'FINAL_OVERTIME'`

   - `'Q1'`, `'Q2'`, `'Q3'`, and `'Q4'`

   - `'OT1'`, `'OT2'`, `'OT3'` ... _(multiple overtimes is currently only possible in playoff games)_

### About the League

This style of league is great because it takes very little effort but makes the whole season more fun. Each person drafts a certain number of teams for either their wins or their losses. Once a team's wins or losses have been drafted, no other participant can draft that team. You then get a point for each matching result (ex: if I draft the Jaguars for wins, I get one point for each win they accumulate during the season.) No points for ties.

#### **Tips**

- Leave a few teams undrafted, so no one gets stuck with the worst team (ex: with 10 participants we each drafted 6 teams leaving 4 undrafted)

- If you are playing for cash, make the cost or payout of each finishing spot different, that way each week matters, even if you aren't going to win
