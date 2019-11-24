// Built using this tutorial
// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/

// Why doesn't (1) work when (2) does?
// 1) document.write(game["home"]["abbr"])
// 2) document.write(data[gameId]["home"]["abbr"])


// Sets constant app to the first div inside the body
const gameCardContainer = document.getElementById('gameCardContainer')

var request = new XMLHttpRequest()

// Request method withOUT CORS
request.open('GET', 'http://www.nfl.com/liveupdate/scores/scores.json', true)

// Request method with CORS passthrough
// Works, but slower. This tutorial explains:
// https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
//request.open('GET', 'https://cors-anywhere.herokuapp.com/http://www.nfl.com/liveupdate/scores/scores.json', true)

request.onload = function() {
  // Begin accessing JSON data here
  // Builds new elements as it goes
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {

    // This is the first time I was able to access something deep in the nest. Now I need to figure out how to iterate through the games
    for (game in data) {

      var gameId = game // holds iterator index for loop

      // Checks if the game has begun (null means has not begun)
      if (data[gameId]["away"]["score"]["T"] != -1) {

        // Create .gameCard
        const gameCard = document.createElement('div')
        gameCard.setAttribute('class', 'gameCard card')
        
        
        // Create .gameCardBody
        const gameCardBody = document.createElement('div')
        gameCardBody.setAttribute('class', 'card-body')

        // Create away team <p>
        const awayTeamInfo = document.createElement('h5')
        awayTeamInfo.setAttribute('class', 'gameCardScore')
        awayTeamInfo.textContent = (
          data[gameId]["away"]["abbr"] +
          " " +
          data[gameId]["away"]["score"]["T"]
        )

        // Create home team <p>
        const homeTeamInfo = document.createElement('h5')
        homeTeamInfo.setAttribute('class', 'gameCardScore')
        homeTeamInfo.textContent = (
          data[gameId]["home"]["abbr"] +
          " " +
          data[gameId]["home"]["score"]["T"]
        )

        // Create details <p>
        const details = document.createElement('div')
        details.setAttribute('class', 'gameCardDetails card-footer text-muted text-right')
        details.innerHTML = ("<b>Qtr:</b> " + data[gameId]["qtr"])
        
        // Adds info to gameCardBody
        gameCardBody.appendChild(awayTeamInfo)
        gameCardBody.appendChild(homeTeamInfo)
        
        // Adds gameCardBody to gameCard
        gameCard.appendChild(gameCardBody)
        gameCard.appendChild(details)

        // Add .gameCard to .gameCardContainer
        gameCardContainer.appendChild(gameCard)
      }
    }
  } else {
    // Error message for failed request
    console.log(`Gah, it's not working!`)
  }
}

request.send()