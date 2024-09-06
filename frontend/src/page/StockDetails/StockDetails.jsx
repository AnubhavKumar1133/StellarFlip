import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BookmarkFilledIcon, DotIcon } from '@radix-ui/react-icons'
import { BookmarkIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import TradingForm from './TradingForm'
import SockChart from '../Home/StockChart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoinDetails } from '@/State/Coin/Action'
import { existInWatchList } from '@/utils/existInWatchList'
import { getUserWatchlist } from '@/State/Watchlist/Action'
import { addCoinToWatchlist } from '@/State/Watchlist/Action'
const StockDetails = () => {
  const {coin, watchlist} = useSelector(store=>store)
  const dispatch = useDispatch()
  const {id} = useParams()
  const handleAddToWatchlist=()=>{
    dispatch(addCoinToWatchlist({coinId:coin.coinDetails?.id, jwt:localStorage.getItem('jwt')}))  
  }

  useEffect(() => {
    dispatch(
      fetchCoinDetails({coinId: id, jwt: localStorage.getItem("jwt")})
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  },[id])
  return (
    <div className='p-5 mt-5'>
      <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>
          <div>
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image.large}/>
            </Avatar>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p>{coin.coinDetails?.symbol}</p>
              <DotIcon className='text-gray-400'/>
              <p>{coin.coinDetails?.name}</p>
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-xl font-bold'>${coin.coinDetails?.market_data.current_price.usd}</p>
              <p className='text-red-600'>
                <span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                <span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button onClick={handleAddToWatchlist}>
            {existInWatchList(watchlist.items,coin.coinDetails)?<BookmarkFilledIcon className='h-6 w-6'/>:
            <BookmarkIcon className='h-6 w-6'/>}
          </Button>
          <Dialog>
              <DialogTrigger>
                <Button size="lg">
                  Trade
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    How much do you want to spend?
                  </DialogTitle>
                </DialogHeader>
                <TradingForm/>
              </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='mt-10'>
        <SockChart coinId={id}/>
      </div>
    </div>
  )
}

export default StockDetails