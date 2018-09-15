const formationsMap = {
  '442': ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD'],
  '433': ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD'],
  '532': ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD'],
  '352': ['GK', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD'],
  '451': ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD'],
  '343': ['GK', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD']
}

// const formationNames = Object.keys(formationsMap)
const formations = Object.values(formationsMap)

function selectRandomTeamFromPlayers(players) {
  var allGK = []
  var allDEF = []
  var allMID = []
  var allFWD = []
  var thisFormation = formations[getRandomNumber(0, 5)]

  var team = []
  let num
  players.forEach((p, i) => {
    let target = []

    if (p.position == 'GK') {
      target = allGK
    } else if (['CB', 'LB', 'RB', 'RWB', 'LWB'].includes(p.position)) {
      target = allDEF
    } else if (['CM', 'CDM', 'CAM', 'RM', 'LM'].includes(p.position)) {
      target = allMID
    } else if (['ST', 'RW', 'LW', 'CF'].includes(p.position)) {
      target = allFWD
    } else {
      throw new Error(`uncaught position ${p.position}`)
    }

    target.push(i)
  })

  thisFormation.forEach((position, i) => {
    if (position == 'GK') {
      num = getRandomNumber(0, allGK.length - 1)
      team[i] = allGK[num]
      allGK.splice(num, 1)
    } else if (position == 'DEF') {
      num = getRandomNumber(0, allDEF.length - 1)
      team[i] = allDEF[num]
      allDEF.splice(num, 1)
    } else if (position == 'MID') {
      num = getRandomNumber(0, allMID.length - 1)
      team[i] = allMID[num]
      allMID.splice(num, 1)
    } else if (position == 'FWD') {
      num = getRandomNumber(0, allFWD.length - 1)
      team[i] = allFWD[num]
      allFWD.splice(num, 1)
    } else {
      throw new Error(`uncaught position ${position}`)
    }
  })

  return team.map(playerIndex => players[playerIndex])
}

function getRandomNumber(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min
  return random
}

module.exports = {
  selectRandomTeamFromPlayers
}
