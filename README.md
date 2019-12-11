# nfl-clientside

This is a project I am creating to build my web development skills. It is a resource for an NFL league I run with some family and friends.

## About the League
This style of league is great because it takes very little effort but makes the whole season more fun. Each person drafts a certain number of teams for either their wins or their losses. Once a team's wins or losses have been drafted, no other participant can draft that team. You then get a point for each matching result (ex: if I draft the Jaguars for wins, I get one point for each win they accumulate during the season.)

#### **Tips**
-   Leave a few teams undrafted, so no one gets stuck with the worst team (ex: with 10 participants we each drafted 6 teams leaving 4 undrafted)
-   If you are playing for cash, make the cost or payout of each finishing spot different, that way each week matters, even if you aren't going to win

## API Information
I used two different NFL APIs to build this site:
1.  ***XML*** - http://www.nfl.com/feeds-rs/standings/2019/REG
    
    This feed updates within about 5 minute of the end of a game. It contains many details including: 
    - wins, losses, and ties
    - week number (updates Thu. AM)
    - *Note that it uses JAC for Jacksonville instead of JAX*

2.  ***JSON*** - http://www.nfl.com/liveupdate/scores/scores.json

    This feed is in real-time as games are progressing. Games have a few different states:
    -   Pregame
    -   1
    -   2
    -   Halftime
    -   3
    -   4
    -   *5* (I haven't seen a game in OT to test this yet)
    -   Final

## Roadmap

### Very Likely
-   Rewrite code for game cards so that they
    - Display in a meaninful order
    - ~~Can be refreshed without page jumps~~
    - Show more details
        - possession
        - down and distance
-   Bump chart showing rank over time
-   ~~Smoother refreshing of standings and cards~~
-   Error messages in case APIs go down

### Maybe
-   NFL schedule showing who is rooting for whom
-   Integrate live win probabilities and/or ELO with game cards
-   Simulator of all games left to predict winner
-   Determine max and min points possible for a given owner based on schedule
-   Version of the page showing the league at a given point, loaded from static saved API files. Purpose of this is so others can see what it looks like as part of a portfolio

## Learning Goals

#### New Skills
-   Accessing APIs
-   Use JavaScript to manipulate HTML DOM
-   Learning Git

#### Skills to Strenghten
-   Responsive design with bootstrap
-   JavaScript Functions