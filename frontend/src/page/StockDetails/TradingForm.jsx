import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { DotIcon } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getUserWallet } from '@/State/wallet/Action'
import { useDispatch } from 'react-redux'
import { getAssetDetails } from '@/State/Asset/Action'
const TradingForm = () => {
    const [orderType, setOrderType] = useState("BUY")
    const [amount, setAmount] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const {coin, wallet, asset } = useState(0)
    const dispatch = useDispatch()
    const handleChange = () =>{
        const amount = e.targe.value
        setAmount(amount)
        const volume = calculateBuyCost(amount, coin?.coinDetails?.market_data.current_price.usd)
        setQuantity(volume)
    }
    const calculateBuyCost = (amount, price) => {
        let volume = amount/price
        let decimalPlaces=Math.max(2, price.toString().split('.')[0].length)
        return volume.toFixed(decimalPlaces)
    }
    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem('jwt')));
        dispatch(getAssetDetails({coinId: coin?.coinDetails?.id, jwt: localStorage.getItem('jwt')}));
    }, [])
    const handleBuyCryto=()=>{
        dispatch(payOrder({
            jwt:localStorage.getItem('jwt'),
            amount,
            orderData: {
                coinId:coin?.coinDetails?.id,
                quantity,
                orderType    
            }
        }))
    }
  return (
    <div className='space-y-10 p-5'>
        <div >
            <div className='flex gap-4 items-center justify-between'>
                <Input
                    className='py-7 focus:outline-none'
                    placeholder='Enter amount...'
                    onChange={handleChange}
                    type="number"
                    name="amount"
                />
                <div>
                    <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>{quantity}</p>
                </div>
            </div>
            {false && <h1 className='text-red-600'>Insufficient wallet balance.</h1>}
        </div>
        <div className='flex gap-5 items-center'>
          <div>
            <Avatar>
              <AvatarImage src={"https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"}/>
            </Avatar>
          </div>
            <div>
                <div className='flex items-center gap-2'>
                    <p>BTC</p>
                    <DotIcon className='text-gray-400'/>
                    <p>Bitcoin</p>
                </div>
                <div className='flex items-end gap-2'>
                    <p className='text-xl font-bold'>${coin?.coinDetails?.market_data.current_price.usd}</p>
                    <p className='text-red-600'>
                        <span>-1232412.232</span>
                        <span>(-0.234242%)</span>
                    </p>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <p>Order Type</p>
            <p>Market Order</p>
        </div>
        <div className='flex items-center justify-between'>
            <p>{orderType=="BUY"?"Available Case":"Availbale Quantity"}</p>
            <p>{orderType=="BUY"?"$"+wallet?.userWallet?.balance: asset?.assetDetails?.quantity || 0}</p>
        </div>
        <div>
            <Button onClick={handleBuyCryto} className={`w-full py-6' ${orderType=="SELL"?"bg-red-600 text-white":""}`}>
                {orderType}
            </Button>
            <Button variant='link' className='w-full mt-5 text-xl' onClick={()=>setOrderType(orderType=="BUY"?"SELL":"BUY")}>
                {orderType=="BUY"?"Or Sell":"Or Buy"}
            </Button>
        </div>
    </div>
  )
}

export default TradingForm