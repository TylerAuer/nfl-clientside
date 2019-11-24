//http://www.nfl.com/feeds-rs/standings/2019/REG


// Dict Format --> Abr: [Wins Owner, Losses Owner, Wins, Losses, Ties]
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
  "JAX": ["Tyler", "Narva", 0, 0, 0], // JSON file uses "JAC"
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