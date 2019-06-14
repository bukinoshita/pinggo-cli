const { bold, gray } = require('chalk')

const isPingHigh = ping => {
  const pingStyle = `${gray('(' + ping + 'ms)')}`
  const high = `${bold('(CT) [RADIO]')}: Need backup! Your ping is to high to play. ${pingStyle}`
  const low = `${bold('(TR) [RADIO]')}: Go go go! Locked and loaded, let's play. ${pingStyle}`
  const isHigh = ping > 50 ? high : low

  return isHigh
}

module.exports = isPingHigh
