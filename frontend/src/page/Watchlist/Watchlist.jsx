import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { existInWatchList } from '@/utils/existInWatchList'
import { useEffect } from 'react'
import { getUserWatchlist } from '@/State/Watchlist/Action'
const Watchlist = () => {
  const {watchlist} = useSelector(store => store)
  const dispatch = useDispatch()
  const handleRemoveToWatchlist=(value)=>{
    dispatch(addItemtoWatchlist({coinId:value, jwt:localStorage.getItem('jwt')}))
    console.log(value)
  }
  useEffect(() =>{
    dispatch(getUserWatchlist(localStorage.getItem('jwt')))
  },[dispatch])
  return (
    <div className='p-5 lg:px-20'>
    <h1 className='font-bold text-3xl pb-10'>Porfolio</h1>
      <Table className='border'>
        <TableHeader>
            <TableRow>
            <TableHead className="py-5">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead className='text-right'>REMOVE</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {watchlist.items.map((item, index) => <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
                <Avatar>
                    <AvatarImage className='w-10 h-10' src = {item.image}/>
                </Avatar>
                <span>{item.name}</span>
            </TableCell>
            <TableCell>{item.symbol.toUpperCase()}</TableCell>
            <TableCell>{item.totol_volume}</TableCell>
            <TableCell>{item.market_cap}</TableCell>
            <TableCell>{item.price_change_percentage_24h}</TableCell>
            <TableCell>${item.current_price}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" onClick={() => handleRemoveToWatchlist(item.id)} size="icon" className='h-10 w-10'>
                
                <BookmarkFilledIcon className='w-6 h-6'/>
              </Button>
            </TableCell>
            </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Watchlist