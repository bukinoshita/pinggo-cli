#!/usr/bin/env node

// Packages
const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')
const pinggo = require('pinggo')
const inquirer = require('inquirer')

// Lib
const servers = require('./lib/servers')
const isPingHigh = require('./lib/is-ping-high')

const cli = meow(
  `
  Usage:
    $ pinggo          Choose server to check your ping

  Example:
    $ pinggo

  Options:
    -h, --help         Show help options
    -v, --version      Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = async () => {
  const spinner = ora('Loading resources...')
  const { server } = await inquirer.prompt([
    {
      type: 'list',
      name: 'server',
      message: 'Choose server',
      choices: servers,
      pageSize: servers.length
    }
  ])

  spinner.start()

  const { ip } = servers.filter(item => item.value === server)[0]
  const ping = await pinggo(ip)

  spinner.stop()

  console.log(isPingHigh(ping))
}

run()
