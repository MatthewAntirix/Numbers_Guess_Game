import React, {useState} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import "./basic.css"

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }


export const NumbersGuessGame = () => {
  const [max, setMax] = useState(50)
  const [guess, setGuess] = useState("")
  const [counter, setCounter] = useState(0)

  let maxNumber = (max > 1000000) ? 1000000 : parseInt(max)
  const [guessNumber] = useState(Math.ceil((Math.random()) * maxNumber))
    let difference = Math.abs(guess - guessNumber)
    let number = (guess > guessNumber ? language.lowerNumber : language.higherNumber)
    let result


  // eslint-disable-next-line eqeqeq
  if(guess == guessNumber) {
    result = language.correctNumber

  } else {
    if (difference < maxNumber * 0.1) {
      result  = `${language.distance1} - ${number}`
    } else if (difference < maxNumber * 0.3) {
      result  = `${language.distance2} - ${number}`
    } else if(difference < maxNumber * 0.5) {
      result  = `${language.distance3} - ${number}`
    } else {
      result  = `${language.distance4} - ${number}`
    }
  }

 
  return (
      <>
          <h1>{language.title}</h1>
          <input type={"number"} min="0" max="1000000"  placeholder={language.maxNumber} onChange={e => setMax(e.target.value)}></input>
          <input type={"number"} min="0" max={max}  placeholder={language.guessNumber} onChange={e => [setGuess(e.target.value), setCounter(counter + 1)]}></input>
          <h2>{result} </h2>
          <h2>{language.counter} {counter}</h2>

          Testing block <br></br>
              guess number {guessNumber} <br></br>
              max number {maxNumber} <br></br>
              tip {guess} <br></br>
              diff {difference}<br></br>
              counter {counter}
      </>
  )
}


