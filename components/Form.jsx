import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCoins from '../hooks/useSelectCoins'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const currencies = [
    { id: 'USD', name: 'US Dollar '},
    { id: 'EUR', name: 'Euro'},
    { id: 'GBP', name: 'Pound Sterling'},
    { id: 'MXN', name: 'Mexican Peso'},
  ]

const Form = ({setCoins, setResult}) => {
    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)

    const [ currency, SelectCurrency ] = useSelectCoins('Select the currency', currencies)
    const [ crypto, SelectCrypto ] = useSelectCoins('Select the cryto', cryptos)

    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const response = await fetch(url)
            const result = await response.json()

            const arrayCryptos = result.Data.map( crypto => {
                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                return object
            })

            setCryptos(arrayCryptos)

        }
        consultAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([currency, crypto].includes('')) {
            setError(true)
            setResult({});
            return
        }

        setError(false)
        setCoins({
            currency,
            crypto
        })
    }
    
    return (
        <>
            {error && <Error>All fields are needed</Error>}

            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrency />
                <SelectCrypto />
                
                <InputSubmit 
                    type="submit" 
                    value="Check" 
                />
            </form>
        </>
    )
}

export default Form
