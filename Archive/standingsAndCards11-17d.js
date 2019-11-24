// API Sources

//// (1) For team wins, losses, and other details:
//// http://www.nfl.com/feeds-rs/standings/2019/REG

//// (2) For current week's standings
//// http://www.nfl.com/liveupdate/scores/scores.json


// Dict Format --> Abr: [Wins Owner, Losses Owner, Wins, Losses, Ties]
// Shows who owns each team
var standings = {
  "ATL": ["Howard", "Hogan", 0, 0, 0],
  "BAL": ["Jamie", "Jessica", 0, 0, 0],
  "BUF": ["Thome", "Team Conn", 0, 0, 0],
  "CAR": ["Barbara", "Jessica", 0, 0, 0],
  "CHI": ["Susan", "Narva", 0, 0, 0],
  "CIN": [null, "Thome", 0, 0, 0],
  "CLE": ["Howard", "Jamie", 0, 0, 0],
  "DAL": ["Team Conn", "Hogan", 0, 0, 0],
  "DEN": ["Susan", "Thome", 0, 0, 0],
  "DET": ["Howard", "Jessica", 0, 0, 0],
  "GB": ["Tyler", "Narva", 0, 0, 0],
  "TEN": ["Team Conn", "Jessica", 0, 0, 0],
  "HOU": ["Jamie", "Barbara", 0, 0, 0],
  "IND": ["Hogan", "Tyler", 0, 0, 0],
  "JAC": ["Tyler", "Narva", 0, 0, 0], // JSON file uses "JAC"
  "KC": ["Thome", null, 0, 0, 0],
  "LA": ["Howard", null, 0, 0, 0],
  "OAK": [null, "Narva", 0, 0, 0],
  "MIA": ["Barbara", "Jamie", 0, 0, 0],
  "MIN": ["Susan", "Tyler", 0, 0, 0],
  "NE": ["Team Conn", "Thome", 0, 0, 0],
  "NO": ["Barbara", "Jamie", 0, 0, 0],
  "NYG": ["Jamie", "Narva", 0, 0, 0],
  "NYJ": ["Susan", "Team Conn", 0, 0, 0],
  "PHI": ["Thome", "Howard", 0, 0, 0],
  "ARI": ["Howard", "Tyler", 0, 0, 0],
  "PIT": ["Barbara", "Susan", 0, 0, 0],
  "LAC": ["Hogan", "Jessica", 0, 0, 0],
  "SF": ["Barbara", "Hogan", 0, 0, 0],
  "SEA": ["Jessica", "Hogan", 0, 0, 0],
  "TB": ["Tyler", "Susan", 0, 0, 0],
  "WAS": ["Team Conn", "Narva", 0, 0, 0],
}

// Uses API (1) to update standings with accurate wins, losses, and ties
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Turns string received from NFL into XML object
    parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml")

    // Iterates through each team
    var x = xmlDoc.getElementsByTagName('teamStanding');
    for (i = 0; i < x.length; i++) { 
      
      // Key for the team in the standings dict
      team = standings[x[i].childNodes[0].getAttribute("abbr")]
      
      // Switches JAX to JAC to fit the JSON data instead of XML data
      if (team = "JAX") {
        team = "JAC"
      }
      // Update wins, losses, then ties
      team[2] = x[i].childNodes[1].getAttribute("overallWins")
      team[3] = x[i].childNodes[1].getAttribute("overallLosses")
      team[4] = x[i].childNodes[1].getAttribute("overallTies")
    }
    
    // Gets week number and names gameCardContainer Appropriatelly
    var weekNumber = x[0].childNodes[1].getAttribute("week")
    document.getElementById('gameCardTitle').innerHTML = "Week " + weekNumber + " Games"
    
    }
};
xhttp.open("GET", "http://www.nfl.com/feeds-rs/standings/2019/REG", true);
xhttp.send();


//
//
// Scorecards Generator
// Uses API (2) to get live scores then adds each team's owners
//
//

// Sets constant app to the first div inside the body
const gameCardContainer = document.getElementById('gameCardContainer')

var request = new XMLHttpRequest()

request.open('GET', 'http://www.nfl.com/liveupdate/scores/scores.json', true)

request.onload = function() {
  // Begin accessing JSON data here
  // Builds new elements as it goes
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {

    // This is the first time I was able to access something deep in the nest. Now I need to figure out how to iterate through the games
    for (game in data) {

      var gameId = game // holds iterator index for loop

      // Current quarter, can be null, 1, 2, 3, 4, ??
      const qtr = data[gameId]["qtr"]

      // Card element
      const gameCard = document.createElement('div')
      gameCard.className += " card gameCard shadow"

      // Main body of card (everything except footer)
      const gameCardBody = document.createElement('div')
      gameCardBody.className += ' card-body'

      // Looks up score
      // Replaces null values with 0 when games have not begun
      var awayScore, homeScore
      if (qtr == null || qtr == "Pregame") {
        awayScore = "0"
        homeScore = "0"
      } else {
        awayScore = data[gameId]["away"]["score"]["T"]
        homeScore = data[gameId]["home"]["score"]["T"]
      }


      var awayWinsOwner = ""
      var awayLossesOwner = ""
      var homeWinsOwner = ""
      var homeLossesOwner = ""

      // Looks up team owners, fills in owners if they exist
      if (standings[data[gameId]["away"]["abbr"]][0] != null) {
        awayWinsOwner = "<b>W: </b>" + standings[data[gameId]["away"]["abbr"]][0] + " "
      }
      if (standings[data[gameId]["away"]["abbr"]][1] != null) {
        awayLossesOwner = "<b>L: </b>" + standings[data[gameId]["away"]["abbr"]][1]
      }
      if (standings[data[gameId]["home"]["abbr"]][0] != null) {
        homeWinsOwner = "<b>W: </b>" + standings[data[gameId]["home"]["abbr"]][0] + " "
      }
      if (standings[data[gameId]["home"]["abbr"]][1] != null) {
        homeLossesOwner = "<b>L: </b>" + standings[data[gameId]["home"]["abbr"]][1]
      }

      // Away team (top). Placed in gameCard <div>
      const awayTeamInfo = document.createElement('div')
      awayTeamInfo.className += ' gameCardScore'
      awayTeamInfo.innerHTML = (
        "<h4>" + data[gameId]["away"]["abbr"] + " " +  + awayScore + " </h4>" +
        "<span class='gameCardOwner'>" + awayWinsOwner + awayLossesOwner + "</span>"
      )

      // Home team (bottom). Placed in gameCard <div>
      const homeTeamInfo = document.createElement('div')
      homeTeamInfo.className += ' gameCardScore'
      homeTeamInfo.innerHTML = (
        "<h4>" + data[gameId]["home"]["abbr"] + " " +  + homeScore + " </h4>" +
        "<span class='gameCardOwner'>" + homeWinsOwner + homeLossesOwner + "</span>"
      )

      // Footer time details
      const details = document.createElement('div')
      details.className += ' gameCardDetails card-footer text-right'

      // If game has not begun
      if (qtr == null || qtr == "Pregame") {
        details.innerHTML = ("<i>Pregame</i>")
        details.className += " gameCardFooterPregame"

        // If game in progress
      } else if (qtr != "Final") {
        details.innerHTML = (data[gameId]["clock"] + " | " + qtr) 
        gameCard.className += " border-secondary"
        details.className += " gameCardFooterInProgress"


        // If game has ended
      } else {
        details.innerHTML = ("<i>Game Over</i>")
        gameCard.className += " border-dark"
        details.className += " gameCardFooterGameOver"
      }

      // Adds info to gameCardBody
      gameCardBody.appendChild(awayTeamInfo)
      gameCardBody.appendChild(homeTeamInfo)

      // Adds gameCardBody to gameCard
      gameCard.appendChild(gameCardBody)
      gameCard.appendChild(details)

      // Add .gameCard to .gameCardContainer
      gameCardContainer.appendChild(gameCard)
    }

  } else {
    // Error message for failed request
    console.log(`Gah, it's not working!`)
  }
}

request.send()