import React, {useState, useEffect} from 'react'
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
  const [max, setMax] = useState(100)
  const [guess, setGuess] = useState("")
  const [counter, setCounter] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [result, setResult] = useState("")

  let maxNumber = (max > 1000000) ? 1000000 : parseInt(max)
  const [guessNumber, setGuessNumber] = useState(Math.ceil((Math.random()) * maxNumber))
    let difference = Math.abs(guess - guessNumber)
    let number = (guess > guessNumber ? language.lowerNumber : language.higherNumber)

    useEffect(()=>{
      setGuessNumber((Math.ceil((Math.random()) * maxNumber)))
    }, [max, maxNumber]);

    const checkNumber = () => {
    // eslint-disable-next-line eqeqeq
    if(guess == guessNumber) {
      setResult(language.correctNumber)

      if(isWin === false) {
        setIsWin(true)
      }
      
    } else {
      if (difference < maxNumber * 0.1) {
        setResult(`${language.distance1} - ${number}`)
      } else if (difference < maxNumber * 0.3) {
        setResult(`${language.distance2} - ${number}`)
      } else if(difference < maxNumber * 0.5) {
        setResult(`${language.distance3} - ${number}`)
      } else {
        setResult(`${language.distance4} - ${number}`)
      }
    }
  }

 
  return (
    <div>
      <h1>{language.title}</h1>
      
      {isWin ? 
        <>
          <h2>{result} </h2>
          <p>{language.totalAttempt} {counter}</p>
          <form><input type={"submit"} value={language.newGameButton}></input></form>
        </>
      :
        <form
        onSubmit={e => {
          e.preventDefault()
          setCounter(counter + 1)
          checkNumber()
        }}>
          <label>{language.maxNumberLabel} 0 - {max}</label>
          <input type={"number"} min="0" max="1000000"  placeholder={language.maxNumber} onChange={e => setMax(e.target.value)}></input>
          
          <label>{language.guessNumberLabel}:</label>
          <input type={"number"} min="0" max={max}  placeholder={language.guessNumber} onChange={e => [setGuess(e.target.value)]}></input>

          <input type={"submit"} value={language.submitButton}></input>

          <h2>{result} </h2>
          <h2>{language.counter} {counter}</h2>
        </form>
      }
    </div>
  )
}


