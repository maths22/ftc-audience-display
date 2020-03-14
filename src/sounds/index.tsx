import { Howl } from 'howler'

import matchStart from './01-start.wav'
import autoEnd from './02-endauto.wav'
import controllers from './03-controllers.wav'
import countdown from './04-countdown.wav'
import startTeleop from './05-starttele.wav'
import endgameWarning from './06-endgame.wav'
import matchEnd from './07-endmatch.wav'
import abortMatch from './99-abort.wav'
import woosh from './woosh.wav'

export const sounds = {
  matchStart: new Howl({
    src: matchStart
  }),
  autoEnd: new Howl({
    src: autoEnd
  }),
  controllers: new Howl({
    src: controllers
  }),
  countdown: new Howl({
    src: countdown
  }),
  startTeleop: new Howl({
    src: startTeleop
  }),
  endgameWarning: new Howl({
    src: endgameWarning
  }),
  matchEnd: new Howl({
    src: matchEnd
  }),
  abortMatch: new Howl({
    src: abortMatch
  }),
  announceScores: new Howl({
    src: woosh
  })
};

export default function play(sound: string) {
  // TODO any caching?
  sounds[sound].play()
}
