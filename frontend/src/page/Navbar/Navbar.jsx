import React from 'react'
import { Sheet, SheetHeader, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon, DragHandleHorizontalIcon, DragHandleVerticalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import avatarImg from 'D:/java/trading/logo.png'
import Sidebar from './Sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux'

function Navbar() {
    const {auth}=useSelector(store=>store)
  return (
    <div className='px-3 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
        <div className='flex items-center gap-3 pl-4 p-2'>
            <Sheet>
                <SheetTrigger>
                    <Button size="icon" className="rounded-10 h-10 w-10">
                        <ChevronRightIcon className='w-6 h-6'/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 flex flex-col justify-center items-center">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="text-3xl flex justify-center items-center gap-1">
                                <Avatar>
                                    <AvatarImage src={avatarImg} />
                                </Avatar>
                                <div>
                                    <span className='font-bold'>StellarFlip</span>
                                </div>
                            </div>  
                        </SheetTitle>
                    </SheetHeader>
                    <Sidebar />
                </SheetContent>
            </Sheet>
            <p className='text-2xl 3xl:text-base cursor-pointer font-semibold text-white'>StellarFlip Trading</p>
            <div className='pl-1 ml-10'>
                <Button className="flex items-center gap-3">
                    <MagnifyingGlassIcon />
                    <span>
                        Search
                    </span>
                </Button>
            </div>
        </div>
        <div className='mr-10'>
            <Avatar className='hover:cursor-pointer border border-green-400 rounded-full bg-green-400 flex items-center justify-center w-10 h-10'>
                <AvatarFallback className='text-black font-semibold '>
                    {auth.user?.fullName[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        </div>
    </div>
  )
}

export default Navbar
