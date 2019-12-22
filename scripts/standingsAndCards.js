// ###########
// API Sources
// ###########

// (1) For team wins, losses, and other details:
// http://www.nfl.com/feeds-rs/standings/2019/REG

// (2) For current week's scores and games
// https://feeds.nfl.com/feeds-rs/scores.json

// Wraps HTML with a tag and, optionally, attributes
function wrapInTag(stringToWrap, tagType, HTMLAttributes) {
  // Expects strings for all parameters
  // Returns HTML string wrapped in tag with optional attributes
  HTMLAttributes = HTMLAttributes || ""
  var result = "<" + tagType + " " + HTMLAttributes + ">" + stringToWrap + "</" + tagType + ">"
  return result
}

// ###############
// Data Structures
// ###############

// Dict Format --> Abr: [Wins Owner, Losses Owner, Wins, Losses, Ties]
// Shows who owns each team
var teams = {
  "ARI": ["Howard", "Tyler", 0, 0, 0],
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
  "HOU": ["Jamie", "Barbara", 0, 0, 0],
  "IND": ["Hogan", "Tyler", 0, 0, 0],
  "JAC": ["Tyler", "Narva", 0, 0, 0], // JSON file uses "JAX"
  "KC": ["Thome", null, 0, 0, 0],
  "LA": ["Howard", null, 0, 0, 0],
  "LAC": ["Hogan", "Jessica", 0, 0, 0],
  "MIA": ["Barbara", "Jamie", 0, 0, 0],
  "MIN": ["Susan", "Tyler", 0, 0, 0],
  "NE": ["Team Conn", "Thome", 0, 0, 0],
  "NO": ["Barbara", "Jamie", 0, 0, 0],
  "NYG": ["Jamie", "Narva", 0, 0, 0],
  "NYJ": ["Susan", "Team Conn", 0, 0, 0],
  "OAK": [null, "Narva", 0, 0, 0],
  "PHI": ["Thome", "Howard", 0, 0, 0],
  "PIT": ["Barbara", "Susan", 0, 0, 0],
  "SF": ["Barbara", "Hogan", 0, 0, 0],
  "SEA": ["Jessica", "Hogan", 0, 0, 0],
  "TB": ["Tyler", "Susan", 0, 0, 0],
  "TEN": ["Team Conn", "Jessica", 0, 0, 0],
  "WAS": ["Team Conn", "Narva", 0, 0, 0]
}

var standings = {
  "Narva": [
    [-1, -1, 7], // Rank, Total Pts., and Rd 1 pick #
    ["OAK", "L", ""], // Blank string will hold pts for each team
    ["WAS", "L", ""],
    ["NYG", "L", ""],
    ["JAC", "L", ""],
    ["CHI", "L", ""],
    ["GB", "L", ""]
  ],
  "Jamie": [
    [-1, -1, 1], // Rank, Total Pts., and Rd 1 pick #
    ["MIA", "L", ""], // Blank string will hold pts for each team
    ["HOU", "W", ""],
    ["BAL", "W", ""],
    ["CLE", "L", ""],
    ["NYG", "W", ""],
    ["NO", "L", ""]
  ],
  "Barbara": [
    [-1, -1, 8], // Rank, Total Pts., and Rd 1 pick #
    ["NO", "W", ""], // Blank string will hold pts for each team
    ["PIT", "W", ""],
    ["HOU", "L", ""],
    ["CAR", "W", ""],
    ["SF", "W", ""],
    ["MIA", "W", ""]
  ],
  "Jessica": [
    [-1, -1, 4], // Rank, Total Pts., and Rd 1 pick #
    ["SEA", "W", ""], // Blank string will hold pts for each team
    ["DET", "L", ""],
    ["TEN", "L", ""],
    ["CAR", "L", ""],
    ["BAL", "L", ""],
    ["LAC", "L", ""]
  ],
  "Hogan": [
    [-1, -1, 6], // Rank, Total Pts., and Rd 1 pick #
    ["CIN", "L", ""], // Blank string will hold pts for each team
    ["LAC", "W", ""],
    ["IND", "W", ""],
    ["SF", "L", ""],
    ["ATL", "L", ""],
    ["SEA", "L", ""]
  ],
  "Thome": [
    [-1, -1, 3], // Rank, Total Pts., and Rd 1 pick #
    ["KC", "W", ""], // Blank string will hold pts for each team
    ["PHI", "W", ""],
    ["DEN", "L", ""],
    ["DAL", "L", ""],
    ["BUF", "W", ""],
    ["NE", "L", ""]
  ],
  "Susan": [
    [-1, -1, 10], // Rank, Total Pts., and Rd 1 pick #
    ["CHI", "W", ""], // Blank string will hold pts for each team
    ["TB", "L", ""],
    ["MIN", "W", ""],
    ["DEN", "W", ""],
    ["NYJ", "W", ""],
    ["PIT", "L", ""]
  ],
  "Team Conn": [
    [-1, -1, 2], // Rank, Total Pts., and Rd 1 pick #
    ["NE", "W", ""], // Blank string will hold pts for each team
    ["BUF", "L", ""],
    ["DAL", "W", ""],
    ["NYJ", "L", ""],
    ["TEN", "W", ""],
    ["WAS", "W", ""]
  ],
  "Tyler": [
    [-1, -1, 5], // Rank, Total Pts., and Rd 1 pick #
    ["ARI", "L", ""], // Blank string will hold pts for each team
    ["GB", "W", ""],
    ["JAC", "W", ""],
    ["IND", "L", ""],
    ["MIN", "L", ""],
    ["TB", "W", ""]
  ],
  "Howard": [
    [-1, -1, 9], // Rank, Total Pts., and Rd 1 pick #
    ["LA", "W", ""], // Blank string will hold pts for each team
    ["CLE", "W", ""],
    ["ATL", "W", ""],
    ["PHI", "L", ""],
    ["ARI", "W", ""],
    ["DET", "W", ""]
  ]
}

var numberOfParticipants = 0
for (participant in standings) {
  numberOfParticipants += 1
}

// #######################
// Collect Wins and Losses
// Updates teams then standings dicts
// #######################

// Uses API (1) to update teams with accurate wins, losses, and ties
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Turns string received from NFL into XML object
    parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml")

    // Iterates through each team
    var x = xmlDoc.getElementsByTagName('teamStanding');
    for (i = 0; i < x.length; i++) {

      // Key for the team in the standings dict
      var teamAbbr = x[i].childNodes[0].getAttribute("abbr")

      // Switches JAX to JAC to fit the JSON data instead of XML data
      if (teamAbbr == "JAX") {
        teamAbbr = "JAC"
      }


      // Update wins, losses, then ties in the teams dict
      teams[teamAbbr][2] = x[i].childNodes[1].getAttribute("overallWins")
      teams[teamAbbr][3] = x[i].childNodes[1].getAttribute("overallLosses")
      teams[teamAbbr][4] = x[i].childNodes[1].getAttribute("overallTies")
    }

    // Updates the points per team and overall points in the standings dict
    for (participant in standings) {
      var sumOfPoints = 0
      for (draftedTeam in standings[participant]) {

        // Updates pts for drafted team after checking if wins or losses are needed
        if (standings[participant][draftedTeam][1] == "W") {
          var points = teams[standings[participant][draftedTeam][0]][2]
          standings[participant][draftedTeam][2] = points
          sumOfPoints += Number(points)
        }
        // If team is for losses
        else if (standings[participant][draftedTeam][1] == "L") {
          var points = teams[standings[participant][draftedTeam][0]][3]
          standings[participant][draftedTeam][2] = points
          sumOfPoints += Number(points)
        }
      }

      // Updates overall points
      standings[participant][0][1] = sumOfPoints
    }

    // #############################################
    // Determines each person's rank (last-to-first)
    // #############################################

    // How rank is determined; move to next level if tied
    // -------------------------
    // (0) Most pts overall
    // (1) Most pts for 6th round team
    // (2) Most pts for 5th round team
    // (3) Most pts for 4th round team
    // (4) Most pts for 3rd round team
    // (5) Most pts for 2nd round team
    // (6) Most pts for 1st round team
    // (7) Latest pick in round 1 <-- never a tie!
    // -------------------------

    // Makes an array of participants whose rank has not been assigned yet
    // Array empties in while loop as ranks are assigned
    var unrankedParticipantsList = []
    for (participant in standings) {
      unrankedParticipantsList.push(participant)
    }

    // Counter for points (used in while loop)  
    var pointsCounter = 0
    var whileLoopCounter = 0

    while (unrankedParticipantsList.length > 0) {

      // Avoid crash if error
      if (pointsCounter > 200) {
        console.log("Passed 100 points")
        break
      }

      // Collects all participants at a given score
      var lowestScoringParticipantsLeft = []
      for (participant of unrankedParticipantsList) {
        // If participant's score matches the current score being checked
        if (standings[participant][0][1] == pointsCounter) {
          lowestScoringParticipantsLeft.push(participant)
        }
      }

      // Goes to next iteration of the while loop when no teams at current score
      if (lowestScoringParticipantsLeft.length == 0) {
        pointsCounter += 1
        continue
      }

      // Goes through the 7 possible tiebreakers which are always index of 2 in standings arrays
      // Loops until only one person left; skipped if only one person at a given score
      tiebreakerLevel = 6
      while (lowestScoringParticipantsLeft.length > 1) {
        var tiebreakerScore = []

        // Finds the lowest tiebreaker score
        for (participant of lowestScoringParticipantsLeft) {
          tiebreakerScore.push(parseInt(standings[participant][tiebreakerLevel][2]))
        }

        // Determines the lowest value (so higher scorers can be removed)
        minTiebreakerScore = Math.min(...tiebreakerScore)

        // Removes participants if they *WIN* a tiebreaker
        for (var i = 0; i < lowestScoringParticipantsLeft.length; i++) {
          if (standings[lowestScoringParticipantsLeft[i]][tiebreakerLevel][2] > minTiebreakerScore) {
            lowestScoringParticipantsLeft.splice(i, 1);
          }
        }

        // Moves to the next tiebreaker to be used if > 1 person left
        tiebreakerLevel -= 1
      }

      // Assign rank equal to length of unrankedParticipants
      standings[lowestScoringParticipantsLeft[0]][0][0] = unrankedParticipantsList.length

      // Remove ranked participant from unrankedParticipants 
      for (var i = 0; i < unrankedParticipantsList.length; i++) {

        if (unrankedParticipantsList[i] == lowestScoringParticipantsLeft[0]) {
          unrankedParticipantsList.splice(i, 1);
        }

      }
    }


    // #############################
    // Generates Standings Table
    // #############################

    const standingsTableBody = document.getElementById('standingsTableBody')
    standingsTableBody.innerHTML = "" // Empties the <tbody>, necessary for refresh

    for (var i = 1; i <= numberOfParticipants; i++) {

      for (participant in standings) {

        if (standings[participant][0][0] == i) {

          // Create an empty <tr> element and add it to last position of the table:
          var row = standingsTableBody.insertRow(-1)

          // Rank
          const cell1 = row.insertCell()
          cell1.className += " tableRank align-middle"
          cell1.innerHTML = standings[participant][0][0]

          // Owner
          const cell2 = row.insertCell()
          cell2.className += " tableOwner align-middle"
          cell2.innerHTML = participant

          // Overal Pts
          const cell3 = row.insertCell()
          cell3.className += " tableOverallPoints align-middle"
          cell3.innerHTML = standings[participant][0][1]

          //Points per team drafted
          for (pick in standings[participant]) {
            if (pick == 0) {
              continue
            }

            const cell4 = row.insertCell()

            // If team for wins
            if (standings[participant][pick][1] == "W") {
              cell4.className += " tableWin align-middle d-none d-md-table-cell"
            } else {
              cell4.className += " tableLoss align-middle d-none d-md-table-cell"
            }

            var recordString = (
              standings[participant][pick][0] + ": " +
              teams[standings[participant][pick][0]][2] + "-" +
              teams[standings[participant][pick][0]][3]
            )
            if (teams[standings[participant][pick][0]][4] != "0") {
              recordString += "-" + teams[standings[participant][pick][0]][4]
            }

            cell4.setAttribute("data-toggle", "tooltip")
            cell4.setAttribute("data-placement", "top")
            cell4.setAttribute("title", recordString)

            // data-toggle="tooltip" data-placement="top" title="Tooltip on top"
            cell4.innerHTML = (
              standings[participant][pick][0] +
              "<br>" +
              standings[participant][pick][2] +
              " pts."
            )
          }
        }
      }
    }
  }
}

// Loads the standings and then refreshes them every 2.5 minutes
updateStandings() // Loads the standings initially

window.setInterval(updateStandings, 150000) // Updates every 2.5 minutes

function updateStandings() {
  xhttp.open("GET", "http://www.nfl.com/feeds-rs/standings/2019/REG", true)
  xhttp.send()
}

// ########################
// Generates the Scorecards
// ########################

function updateScorecards() {

  var request = new XMLHttpRequest()
  request.open('GET', 'https://feeds.nfl.com/feeds-rs/scores.json', true)

  // Used to test locally save APIs. 
  // Will need to ignore CORS restrictions to make work
  // request.open('GET', 'http://nfl.mathfireworks.com/APIs/API-Example-18.json', true)

  request.onload = function () {

    // Div holding all of the game cards
    if (request.status >= 200 && request.status < 400) {

      var data = JSON.parse(this.response)

      const gameCardContainer = document.getElementById('gameCardContainer')

      weekNumber = data.week
      var gameCardsDivHeader = document.getElementById("gameCardTitle")
      gameCardsDivHeader.innerHTML = "Week " + weekNumber + " Games"

      //// For loop each game
      data.gameScores.forEach(game => {
        // Variables for 



        var gameId = game.gameSchedule.gameId
        var gameDate = game.gameSchedule.isoTime
        var gameStartTime = game.gameSchedule.gameTimeEastern
        var gameLocation = game.gameSchedule.site.siteFullname
        var d = new Date(gameDate)
        var dayNames = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
        var dayHour = d.getHours() % 12
        var dayMinute = d.getMinutes().toString()
        // Adds leading 0 to avoid time like 1:5 for 1:05
        if (dayMinute.length < 2) {
          dayMinute = "0" + dayMinute
        }
        dateString = dayNames[d.getDay()] + " " + dayHour + ":" + dayMinute

        var awayTeam = game.gameSchedule.visitorTeamAbbr
        // Fix Jac vs Jax discrepancy
        if (awayTeam == "JAX") {
          awayTeam = "JAC"
        }

        var awayTeamWinsOwner = teams[awayTeam][0]
        var awayTeamLossesOwner = teams[awayTeam][1]
        var awayTeamScore = 0 // For games that have not begun 

        var homeTeam = game.gameSchedule.homeTeamAbbr
        // Fix Jac vs Jax discrepency
        if (homeTeam == "JAX") {
          homeTeam = "JAC"
        }
        var homeTeamWinsOwner = teams[homeTeam][0]
        var homeTeamLossesOwner = teams[homeTeam][1]
        var homeTeamScore = 0 // For games that have not begun

        var gameWinner = null // Can be use to check if a game is over 

        // Checks if games have not begun which return Null for score nodes
        var gameState = undefined
        var qtrTimeLeft = undefined
        var down = undefined
        var distance = undefined
        var yardline = undefined
        var yardlineSide = undefined
        var awayTeamTOLeft = undefined
        var homeTeamTOLeft = undefined
        var posTeam = undefined

        if (game.score != null) {
          gameState = game.score.phase // Null, ..., Final
          qtrTimeLeft = game.score.time
          if (gameState != "FINAL" && gameState != "PREGAME" && gameState != "HALFTIME") {
            posTeam = game.score.possessionTeamAbbr
            // Fix Jac vs Jax discrepency
            if (posTeam == "JAX") {
              posTeam = "JAC"
            }
          }
          down = game.score.down
          distance = game.score.yardsToGo
          yardline = game.score.yardline
          yardlineSide = game.score.yardlineSide

          awayTeamScore = game.score.visitorTeamScore.pointTotal
          awayTeamTOLeft = game.score.visitorTeamScore.timeoutsRemaining

          homeTeamScore = game.score.homeTeamScore.pointTotal
          homeTeamTOLeft = game.score.homeTeamScore.timeoutsRemaining

          // Determines winner if game is over
          if (gameState == "FINAL") {
            if (awayTeamScore == homeTeamScore) {
              gameWinner = "Tie"
            } else if (awayTeamScore > homeTeamScore) {
              gameWinner = awayTeam
            } else {
              gameWinner = homeTeam
            }
          }

          // Renames down with fancy name (ex: 1 --> 1st)
          switch (down) {
            case 1:
              down = '1st'
              break

            case 2:
              down = '2nd'
              break

            case 3:
              down = '3rd'
              break

            case 4:
              down = '4th'
          }
        }

        // var gameCard = ""

        // Build Card Element
        // Makes new gameCard unless one exists
        if (document.getElementById(gameId) == null) {
          // If making a new gameCard
          gameCard = document.createElement('div')
          gameCard.id = gameId
          gameCard.className += " card gameCard shadow"
        } else {
          // If gameCard already exists
          gameCard = document.getElementById(gameId)
          gameCard.innerHTML = ""
        }

        // Main body of card (everything except footer)
        const gameCardBody = document.createElement('div')
        gameCardBody.className += ' card-body'

        var posIcon = '<img src="img/posIcon.png" alt="Possession Icon" class="posIcon">'

        // Away team (top). Placed in gameCard <div>. Ex:
        // JAX 24 *
        // W: Tyler L: Dan
        const awayTeamInfo = document.createElement('div')
        awayTeamInfo.className += ' gameCardScore'

        var awayTeamLine1HTML = ""
        var awayTeamLine2HTML = ""

        if (gameWinner == awayTeam) {

          awayTeamLine1HTML += wrapInTag(awayTeam + " " + awayTeamScore, "span", 'class="gameCardAwayTeamHappy";')

          if (awayTeamWinsOwner != null) {
            awayTeamLine2HTML += wrapInTag("<b>W: </b>" + awayTeamWinsOwner, "span", 'class="gameCardOwnerHappy";')
            awayTeamLine2HTML += " "
          }
          if (awayTeamLossesOwner != null) {
            awayTeamLine2HTML += wrapInTag("<b>L: </b>" + awayTeamLossesOwner, "span", 'class="gameCardOwnerSad";')
          }


        } else if (gameWinner == homeTeam) {

          awayTeamLine1HTML += wrapInTag(awayTeam + " " + awayTeamScore, "span", 'class="gameCardAwayTeamSad";')

          if (awayTeamWinsOwner != null) {
            awayTeamLine2HTML += wrapInTag("<b>W: </b>" + awayTeamWinsOwner, "span", 'class="gameCardOwnerSad";')
            awayTeamLine2HTML += " "
          }
          if (awayTeamLossesOwner != null) {
            awayTeamLine2HTML += wrapInTag("<b>L: </b>" + awayTeamLossesOwner, "span", 'class="gameCardOwnerHappy";')
          }


        } else {

          awayTeamLine1HTML += awayTeam + " " + awayTeamScore

          if (awayTeamWinsOwner != null) {
            awayTeamLine2HTML += "<b>W: </b>" + awayTeamWinsOwner + " "
          }
          if (awayTeamLossesOwner != null) {
            awayTeamLine2HTML += "<b>L: </b>" + awayTeamLossesOwner
          }
        }

        var awayScoreHTML = wrapInTag(awayTeamScore, "span", 'class="gameCardAwayTeamScore";')

        // Adds possession marker, if needed
        if (posTeam == awayTeam) {
          awayTeamLine1HTML += posIcon
          awayTeamLine1HTML = wrapInTag(awayTeamLine1HTML, "h3", 'class="gameCardAwayTeam";')
        } else {
          awayTeamLine1HTML = wrapInTag(awayTeamLine1HTML, "h3", 'class="gameCardAwayTeam";')
        }
        awayTeamLine2HTML = wrapInTag(awayTeamLine2HTML, "span", 'class="gameCardOwner";')
        awayTeamInfo.innerHTML = awayTeamLine1HTML + "<br>" + awayTeamLine2HTML



        // Home team (top). Placed in gameCard <div>. Ex:
        // JAX 24 *
        // W: Tyler L: Dan
        const homeTeamInfo = document.createElement('div')
        homeTeamInfo.className += ' gameCardScore'

        var homeTeamLine1HTML = ""
        var homeTeamLine2HTML = ""

        if (gameWinner == homeTeam) {

          homeTeamLine1HTML += wrapInTag(homeTeam + " " + homeTeamScore, "span", 'class="gameCardHomeTeamHappy";')

          if (homeTeamWinsOwner != null) {
            homeTeamLine2HTML += wrapInTag("<b>W: </b>" + homeTeamWinsOwner, "span", 'class="gameCardOwnerHappy";')
            homeTeamLine2HTML += " "
          }
          if (homeTeamLossesOwner != null) {
            homeTeamLine2HTML += wrapInTag("<b>L: </b>" + homeTeamLossesOwner, "span", 'class="gameCardOwnerSad";')
          }
        } else if (gameWinner == awayTeam) {

          homeTeamLine1HTML += wrapInTag(homeTeam + " " + homeTeamScore, "span", 'class="gameCardHomeTeamSad";')

          if (homeTeamWinsOwner != null) {
            homeTeamLine2HTML += wrapInTag("<b>W: </b>" + homeTeamWinsOwner, "span", 'class="gameCardOwnerSad";')
            homeTeamLine2HTML += " "
          }
          if (homeTeamLossesOwner != null) {
            homeTeamLine2HTML += wrapInTag("<b>L: </b>" + homeTeamLossesOwner, "span", 'class="gameCardOwnerHappy";')
          }
        } else {
          homeTeamLine1HTML += homeTeam + " " + homeTeamScore

          if (homeTeamWinsOwner != null) {
            homeTeamLine2HTML += "<b>W: </b>" + homeTeamWinsOwner + " "
          }
          if (homeTeamLossesOwner != null) {
            homeTeamLine2HTML += "<b>L: </b>" + homeTeamLossesOwner
          }
        }

        var homeScoreHTML = wrapInTag(homeTeamScore, "span", 'class="gameCardHomeTeamScore";')

        // Adds possession marker, if needed
        if (posTeam == homeTeam) {
          homeTeamLine1HTML += posIcon
          homeTeamLine1HTML = wrapInTag(homeTeamLine1HTML, "h3", 'class="gameCardHomeTeam";')
        } else {
          homeTeamLine1HTML = wrapInTag(homeTeamLine1HTML, "h3", 'class="gameCardHomeTeam";')
        }

        homeTeamLine2HTML = wrapInTag(homeTeamLine2HTML, "span", 'class="gameCardOwner";')
        homeTeamInfo.innerHTML = homeTeamLine1HTML + "<br>" + homeTeamLine2HTML

        // Footer time details
        const details = document.createElement('div')
        details.className += ' gameCardDetails card-footer text-right'

        switch (gameState) {
          case "PREGAME":
          case undefined:
            details.innerHTML += dateString + " @ " + gameLocation
            break

          case "FINAL":
          case "FINAL_OVERTIME":
            details.innerHTML += "Game Over"
            details.className += " bg-dark text-white"
            break

          case "HALFTIME":
            details.innerHTML += "Halftime"
            details.className += " bg-danger text-white"
            break

          case "Q1":
          case "Q2":
          case "Q3":
          case "Q4":

            details.innerHTML += down + " & " + distance + " (" + yardline + ") | " + qtrTimeLeft + " " + gameState
            details.className += " bg-danger text-white"
            break

          case "OT1":
          case "OT2":
          case "OT3":
          case "OT4":
          case "OT5": // Overtime
            details.innerHTML += down + " and " + distance + " | OT " + qtrTimeLeft
            details.className += " bg-warning text-white"
            break
        }

        // Adds info to gameCardBody
        gameCardBody.appendChild(awayTeamInfo)
        gameCardBody.appendChild(homeTeamInfo)

        // Adds gameCardBody to gameCard
        gameCard.appendChild(gameCardBody)
        gameCard.appendChild(details)

        // Add .gameCard to .gameCardContainer
        gameCardContainer.appendChild(gameCard)





      })


    } else {

      console.log("API request of https://feeds.nfl.com/feeds-rs/scores.json failed.")

    }
  }
  // Closes the API request
  request.send()
}

// Loads the scorecards and then refreshes every 20 seconds
updateScorecards() // Loads the scorecards initially
window.setInterval(updateScorecards, 20000) // Updates every 20 seconds


// Runs once everything else has loaded and run
$(document).ready(function () {
  // Enables bootstrap tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
})