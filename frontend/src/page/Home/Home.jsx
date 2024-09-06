import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action'
import { useParams } from 'react-router-dom'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const Home =()=> {
    const id = useParams()
    const[category, setCategory] = React.useState("all");
    const[inputValue, setInputValue] = React.useState("");
    const[isBotRelease, setIsBotRelease] = React.useState(false);
    const {coin} = useSelector(store => store);
    const dispatch = useDispatch();
    const handleCategory = (value) => {
        setCategory(value)
    }

    const handleChange = (e) =>{
        setInputValue(e.target.value)
    }
    const handleKeyPress = (event) =>{
        if(event.key == "Enter"){
            console.log(inputValue)
        }
        setInputValue("")
    }

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])
    
    useEffect(() =>{
        dispatch(getCoinList(1))
    }, [])
    const handleBotRelease = () =>setIsBotRelease(!isBotRelease)
    
  return (
    
    <div className='relatve'>
        <div className='lg:flex'>
            <div className='lg:w-[50%] lg:border-r'>
                <div className='p-3 flex items-center gap-4'>
                    <Button 
                        onClick={() => handleCategory("all")} 
                        variant={category=="all"?"default":"outline"} 
                        className="rounded-full"
                    >
                        All
                    </Button>
                    <Button 
                        onClick={() => handleCategory("top50")} 
                        variant={category=="top50"?"default":"outline"} 
                        className="rounded-full"
                    >
                        Top 50
                    </Button>
                    <Button 
                        onClick={() => handleCategory("topGainers")} 
                        variant={category=="topGainers"?"default":"outline"} 
                        className="rounded-full"
                    >
                        Top Gainers
                    </Button>
                    <Button 
                        onClick={() => handleCategory("topLosers")} 
                        variant={category=="topLosers"?"default":"outline"} 
                        className="rounded-full"
                    >
                        Top Losers
                    </Button>
                </div>
                <AssetTable coin={category=="all"?coin.coinList:coin.top50} category={category}/>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">i</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
                </div>
            <div className='hidden lg:block lg:w-[50%] p-5'>
                <StockChart coinId={"bitcoin"}/>
                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src={"https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"}/>
                        </Avatar> 
                    </div> 
                    <div>
                        <div className='flex items-center gap-2'>
                            <p>ETH</p>
                            <DotIcon className='text-gray-400'/>
                            <p className='text-gray-400'>Ethereum</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>5464</p>
                            <p className='text-red-600'>
                                <span>-123412321.232</span>
                                <span>(-0.34232%)</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                
            </div>
    </div>
    <section className='absolute bottom-7 right-7 z-40 flex flex-col justify-end items-end gap-2'>
        {isBotRelease && <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900'>
            <div className='flex justify-between items-center border-b px-6 h-[12%]'>
            <p>Chat Bot</p>
            <Button onClick={handleBotRelease} variant="ghost" size="icon">
                <Cross1Icon/>
            </Button> 
            </div>      
            <div className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container'>
                <div className='self-start pb-5 w-auto'>
                    <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                        <p>Hi, I am Anubhav Kumar</p>
                        <p>You can ask any questions</p>
                        <p>like, price, market cap extra</p>
                    </div>
                </div>
                {
                    [1,1,1].map((item, i)=>(
                    <div key={i} className={`${i%2==0?"self-start":"self-end"} "pb-5 w-auto"`}>
                    {i%2==0?<div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                        <p>Prompt who are you?</p>
                    </div>:
                    <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                        <p>Ans, I am Anubhav Kumar</p>
                    </div>
                }
                </div>))}               
            </div>   
            <div className='h-[12%] border-t'>
                <Input 
                    className='w-full h-full order-none outline-none' 
                    placeholder='write prompt' 
                    onChange={handleChange}
                    value={inputValue}
                    onKeyPress={handleKeyPress}
                    />
            </div>      
        </div>}
        <div className='relative w-[10rem] cursor-pointer group'>
            <Button className='w-full h-[3rem] gap-2 items-center bg-green-500' onClick={handleBotRelease}>
                <MessageCircle className='fill-[#030405] -rotate-90 stroke-none group-hover:fill-[#ffffff]' size={25}/>
                <span className='text-xl  text-black group-hover:text-white'>Chat Bot</span>
            </Button>
        </div>
    </section>
    </div>
  )
}

export default Home