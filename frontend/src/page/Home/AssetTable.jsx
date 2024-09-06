import React, { useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

const AssetTable=({coin, category}) => {
  const navigate = useNavigate()

  return (
    <div className='mr-3 ml-3'>
    <Table>
    <ScrollArea className={`${category=="all"?"h-[77vh]":"h-[82vh]"}`}>
    <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Coin</TableHead>
    <TableHead className="px-5">SYMBOL</TableHead>
    <TableHead>VOLUME</TableHead>
    <TableHead>MARKET CAP</TableHead>
    <TableHead>24h</TableHead>
    <TableHead className="">PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {coin.map((item) => <TableRow className="h-17" key={item.id}>
      <TableCell onClick={()=>navigate(`/market/${item.id}`)} className="font-medium flex items-center gap-2">
          <Avatar className='-z-50'>
              <AvatarImage src = {item.image}/>
          </Avatar>
          <span>{item.name}</span>
      </TableCell>
      <TableCell className="px-5">{item.symbol}</TableCell>
      <TableCell>{item.total_volume}</TableCell>
      <TableCell>{item.market_cap}</TableCell>
      <TableCell>{item.price_change_percentage_24h}</TableCell>
      <TableCell className="">${item.current_price}</TableCell>
      </TableRow>
  )}
  </TableBody>
  </ScrollArea>
   
</Table>
    </div>
  )
}

export default AssetTable