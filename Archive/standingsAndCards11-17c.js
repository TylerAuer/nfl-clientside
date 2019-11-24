//
//
// Scorecards Generator
//
//


// Dict Format --> Abr: [Wins Owner, Losses Owner, Wins, Losses, Ties]
// Shows who owns each team
var standings = {
  "ATL": ["Howard", "Hogan", 0, 0, 0],
  "BAL": ["Jamie", "Jessica", 0, 0, 0],
  "BUF": ["Thome", "Connaughton", 0, 0, 0],
  "CAR": ["Barbara", "Jessica", 0, 0, 0],
  "CHI": ["Susan", "Narva", 0, 0, 0],
  "CIN": ["", "Thome", 0, 0, 0],
  "CLE": ["Howard", "Jamie", 0, 0, 0],
  "DAL": ["Connaughton", "Hogan", 0, 0, 0],
  "DEN": ["Susan", "Thome", 0, 0, 0],
  "DET": ["Howard", "Jessica", 0, 0, 0],
  "GB": ["Tyler", "Narva", 0, 0, 0],
  "TEN": ["Connaughton", "Jessica", 0, 0, 0],
  "HOU": ["Jamie", "Barbara", 0, 0, 0],
  "IND": ["Hogan", "Tyler", 0, 0, 0],
  "JAC": ["Tyler", "Narva", 0, 0, 0], // JSON file uses "JAC"
  "KC": ["Thome", "", 0, 0, 0],
  "LA": ["Howard", "", 0, 0, 0],
  "OAK": ["", "Narva", 0, 0, 0],
  "MIA": ["Barbara", "Jamie", 0, 0, 0],
  "MIN": ["Susan", "Tyler", 0, 0, 0],
  "NE": ["Connaughton", "Thome", 0, 0, 0],
  "NO": ["Barbara", "Jamie", 0, 0, 0],
  "NYG": ["Jamie", "Narva", 0, 0, 0],
  "NYJ": ["Susan", "Connaughton", 0, 0, 0],
  "PHI": ["Thome", "Howard", 0, 0, 0],
  "ARI": ["Howard", "Tyler", 0, 0, 0],
  "PIT": ["Barbara", "Susan", 0, 0, 0],
  "LAC": ["Hogan", "Jessica", 0, 0, 0],
  "SF": ["Barbara", "Hogan", 0, 0, 0],
  "SEA": ["Jessica", "Hogan", 0, 0, 0],
  "TB": ["Tyler", "Susan", 0, 0, 0],
  "WAS": ["Connaughton", "Narva", 0, 0, 0],
}

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
  }
};

console.log(standings)

xhttp.open("GET", "http://www.nfl.com/feeds-rs/standings/2019/REG", true);
xhttp.send();


//
//
// Scorecards Generator
//
//



// Sets constant app to the first div inside the body
const gameCardContainer = document.getElementById('gameCardContainer')

var request = new XMLHttpRequest()

// Request method withOUT CORS
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

      const gameCard = document.createElement('div')
      gameCard.className += "card gameCard"

      const gameCardBody = document.createElement('div')
      gameCardBody.className += 'card-body'

      const awayTeamInfo = document.createElement('div')
      awayTeamInfo.className += 'gameCardScore'

      const homeTeamInfo = document.createElement('div')
      homeTeamInfo.className += 'gameCardScore'

      const details = document.createElement('div')
      details.className += 'gameCardDetails card-footer text-muted text-right'

      //
      // If game has not begun
      //
      // Null is "qtr" value until a few hours before kickoff, then "Pregame"
      if (qtr == null || qtr == "Pregame") {

        // Set game card border color
        gameCard.classList.add("shadow-sm")

        // Set away team score to 0
        awayTeamInfo.innerHTML = (
          "<h4>" + 
          data[gameId]["away"]["abbr"] + 
          " 0 <span class='gameCardWinsOwner'>" 
          + standings[data[gameId]["away"]["abbr"]][0] +
          " </span><span class='gameCardLossesOwner'>" + standings[data[gameId]["away"]["abbr"]][1] +
          "</span></h4>"
        )

        // Set home team score to 0
        homeTeamInfo.innerHTML = (
          "<h4>" + 
          data[gameId]["home"]["abbr"] + 
          " 0 <span class='gameCardWinsOwner'>" 
          + standings[data[gameId]["home"]["abbr"]][0] +
          " </span><span class='gameCardLossesOwner'>" + standings[data[gameId]["home"]["abbr"]][1] +
          "</span></h4>"
        )

        // Set footer to pregame
        details.innerHTML = ("<i>Pregame</i>")


        //
        // If game HAS begun
        //
      } else {

        // Create away team <h4>
        awayTeamInfo.innerHTML = (
          data[gameId]["away"]["abbr"] +
          " " +
          data[gameId]["away"]["score"]["T"]
        )

        // Create home team <h4>
        homeTeamInfo.innerHTML = (
          data[gameId]["home"]["abbr"] +
          " " +
          data[gameId]["home"]["score"]["T"]
        )

        // If game is in progress
        if (qtr != "Final") {

          // Set game card border color
          gameCard.className += "border-secondary"

          // Set footer for in progress game
          details.innerHTML = (data[gameId]["clock"] + " | " + qtr)

          // If game is over
        } else {

          // Set game card border color
          gameCard.className += "border-dark"

          // Set footer for game that is over
          details.innerHTML = ("<i>Game Over</i>")
        }
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