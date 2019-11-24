
//
//
// Standings Generator
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

      // Create .gameCard
      const gameCard = document.createElement('div')


      // Create .gameCardBody
      const gameCardBody = document.createElement('div')
      gameCardBody.setAttribute('class', 'card-body')

      // Current quarter, can be null, 1, 2, 3, 4, ??
      const qtr = data[gameId]["qtr"]
      const awayTeamInfo = document.createElement('h4')
      const homeTeamInfo = document.createElement('h4')
      const details = document.createElement('div')

      // If game has not begun
      if (qtr == null || qtr == "Pregame") {

        // Set game card border color
        gameCard.setAttribute('class', 'gameCard card shadow-sm')

        // Set away team score to 0
        awayTeamInfo.setAttribute('class', 'gameCardScore')
        awayTeamInfo.textContent = (data[gameId]["away"]["abbr"] + " 0")

        // Set home team score to 0
        homeTeamInfo.setAttribute('class', 'gameCardScore')
        homeTeamInfo.textContent = (data[gameId]["home"]["abbr"] + " 0") 

        // Set footer to 
        details.setAttribute('class', 'gameCardDetails card-footer text-muted text-right')
        details.innerHTML = ("<i>Pregame</i>")

        // If game HAS begun
      } else {

        // Create away team <h4>
        awayTeamInfo.setAttribute('class', 'gameCardScore')
        awayTeamInfo.textContent = (
          data[gameId]["away"]["abbr"] +
          " " +
          data[gameId]["away"]["score"]["T"]
        )

        // Create home team <h4>
        homeTeamInfo.setAttribute('class', 'gameCardScore')
        homeTeamInfo.textContent = (
          data[gameId]["home"]["abbr"] +
          " " +
          data[gameId]["home"]["score"]["T"]
        )

        // If game is in progress
        if (qtr != "Final") {

          // Set game card border color
          gameCard.setAttribute('class', 'gameCard card border-secondary shadow-sm')

          // Set footer for in progress game
          details.setAttribute('class', 'gameCardDetails card-footer text-muted text-right')
          details.innerHTML = (data[gameId]["clock"] + " | " + qtr)

          // If game is over
        } else {

          // Set game card border color
          gameCard.setAttribute('class', 'gameCard card border-dark shadow-sm')

          // Set footer for in progress game
          details.setAttribute('class', 'gameCardDetails card-footer text-muted text-right')
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