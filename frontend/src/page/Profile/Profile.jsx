import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AccountVerificationForm from './AccountVerificationForm'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {auth} = useSelector(store=>store)
  const handleEnableTwoStepVerification = ()=>{
    console.log("two step verification")
  }
  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[50%]'>
          <Card>
            <CardHeader className='pb-9'>
              <CardTitle>
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='lg:flex gap-32'>
                <div className='space-y-7'>
                  <div className='flex'>
                    <p className='w-[9rem]'>Email :</p>
                    <p className='text-gray-500'>{auth.user?.email}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-[9rem]'>Full Name :</p>
                    <p className='text-gray-500'>{auth.user?.fullName}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-[9rem]'>Date of Birth :</p>
                    <p className='text-gray-500'>11/01/2004</p>
                  </div>
                  <div className='flex'>
                    <p className='w-[9rem]'>Nationality :</p>
                    <p className='text-gray-500'>Indian</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='mt-6'>
            <Card className='mt-6'>
              <CardHeader className='pb-7'>
                <div className='flex items-center gap-3'>
                  <CardTitle>2 Step Verification</CardTitle>
                  {true?<Badge className='bg-green-500 cursor-pointer'>
                    <VerifiedIcon/>
                    <span>
                      Enabled
                    </span>
                  </Badge>:
                  <Badge className='bg-orange-500 cursor-pointer'>
                   Disabled
                  </Badge>}
                  
                </div>
              </CardHeader>
              <CardContent>
                    <div>
                      <Dialog>
                        <DialogTrigger>
                          <Button>
                            Enable Two Step Verification
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Verify your account
                            </DialogTitle>
                          </DialogHeader>
                          <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification}/>
                        </DialogContent>
                      </Dialog>
                    </div>
              </CardContent>
            </Card>
          </div>
      </div>
    
    </div>
  )
}

export default Profile