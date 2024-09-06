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
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '@/State/Asset/Action'
const Portfolio = () => {
  const dispatch = useDispatch()
  const {asset} = useSelector(store => store.asset)
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem('jwt')))
  },[])
  return (
    <div className='p-5 lg:px-20'>
    <h1 className='font-bold text-3xl pb-10'>Porfolio</h1>
      <Table className='border'>
        <TableHeader>
            <TableRow>
            <TableHead className="py-5">Asset</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>UNIT</TableHead>
            <TableHead>CHANGE</TableHead>
            <TableHead>CHANGE%</TableHead>
            <TableHead className='text-right'>VOLUME</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {asset?.userAssets.map((item, index) => <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
                <Avatar>
                    <AvatarImage src = {item.coin.image}/>
                </Avatar>
                <span>{item.coin.name}</span>
            </TableCell>
            <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.coin.percentage_change_24h}</TableCell>
            <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
            <TableCell className="text-right">{item.coin.total_volume}</TableCell>
            </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Portfolio