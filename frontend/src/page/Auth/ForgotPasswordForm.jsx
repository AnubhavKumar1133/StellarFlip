import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

const ForgotPasswordForm = () => {
    const form=useForm({
        resolver:"",
        defaultValues:{
            email:"",
        }
    })
    const onSubmit = (data) =>{
        console.log(data)
    }
  return (
    
    <div className=''>
      <h1 className='text-xl font-bold text-center pb-3'>Forgot Password</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' >
                <FormField 
                control={form.control}
                name="email"
                render={({field}) =>(
                    <FormItem>
                        <FormControl>
                            <Input 
                                className='border w-full border-gray-700 p-5'
                                placeholder="Enter your Email" {...field}/>
                        </FormControl>
                    </FormItem>
                )}/>
                <Button type='submit' className='w-full py-5 text-black'>
                    Send OTP
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default ForgotPasswordForm