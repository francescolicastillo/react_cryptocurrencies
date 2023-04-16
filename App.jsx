import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Result from './components/Result'
import CryptoImage from './img/crypto-image.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
` 

function App() {

  const [ coins, setCoins ] = useState({})
  const [ result, setResult ] = useState({})

  useEffect(() => {
      if(Object.keys(coins).length > 0) {
          
        const request = async () => {
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.crypto}&tsyms=${coins.currency}`

            const response = await fetch(url)
            const result = await response.json()

            setResult(result.DISPLAY[coins.crypto][coins.currency])
        }

        request()
      }
  }, [coins])

  return (
      <Container>
          <Image 
            src={CryptoImage}
            alt="Cryptocoins image"
          />

          <div>
              <Heading>Buy and Sell Cryptocurrencies instantly</Heading>
              <Form 
                setCoins={setCoins}
                setResult={setResult}
              />

              {Object.keys(result).length > 0 && <Result result={result} />} 
          </div>

      </Container>
  )
}

export default App
