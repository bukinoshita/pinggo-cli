#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')
const pinggo = require('pinggo')
const chalk = require('chalk')

const cli = meow(`
  Usage:
    $ pinggo                    Average NA (North America) ping
    $ pinggo --sa               Average SA (South America) ping

  Example:
    $ pinggo
    $ pinggo --sa
    $ starbucks 'M6K 3P6'

  Options:
    --sa               Show your South America ping

    -h, --help         Show help options
    -v, --version      Show version
`, {
  alias: {
    sa: 'south-america',
    h: 'help',
    v: 'version'
  }
})

updateNotifier({pkg: cli.pkg}).notify()
const spinner = ora('Loading resources...')
const isTooHigh = ping => {
  if (ping > 50) {
    return '(CT) [RADIO]: Need backup! Your ping is to high to play.'
  }

  return '(TR) [RADIO]: Go go go! Locked and loaded, let\'s play.'
}

const puts = (error, stdout) => {
  console.log(`
Your average ping is ${chalk.bold(stdout)}${isTooHigh(stdout)}`)
  spinner.stop()
}

const run = () => {
  if (cli.flags.h) {
    cli.showHelp()
  } else {
    spinner.start()
    let ip = '192.69.96.1'
    if (cli.flags.sa) {
      ip = '209.197.25.1'
    }

    pinggo(ip, puts)
  }
}

run(cli)
