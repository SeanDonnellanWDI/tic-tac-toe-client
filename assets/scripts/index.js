// HEY SEAN!!! Sean, you may edit this file. Don't edit files that don't have this comment at the top. Delete this comment before deliverables are due

'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require(`./auth/events`)

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $(`#someIDofTheThing`).on(`action`, function (event) {event.preventDefault()})
  $(`#signUpForm`).on(`submit`, authEvents.onSignUp)
  $(`#signInForm`).on(`submit`, authEvents.onSignIn)
  $(`#changePasswordForm`).on(`submit`, authEvents.onChangePassword)
  $(`#signOutBtn`).on(`click`, authEvents.onSignOut)
})