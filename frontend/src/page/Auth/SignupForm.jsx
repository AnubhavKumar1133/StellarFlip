import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { register } from '@/State/Auth/Action'

const SignupForm = () => {
    const dispatch = useDispatch()
    const form=useForm({
        resolver:"",
        defaultValues:{
            fullName:"",
            email:"",
            password:"",
        }
    })
    const onSubmit = (data) =>{
        dispatch(register(data))
        console.log(data)
    }
  return (
    <div className=''>
    <h1 className='text-xl font-bold text-center pb-3'>Create New Account</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' >
                <FormField 
                    control={form.control}
                    name="fullName"
                    render={({field}) =>(
                        <FormItem>
                            <FormControl>
                                <Input 
                                    className='border w-full border-gray-700 p-5'
                                    placeholder="Full Name" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                
                <FormField 
                control={form.control}
                name="email"
                render={({field}) =>(
                    <FormItem>
                        <FormControl>
                            <Input 
                                className='border w-full border-gray-700 p-5'
                                placeholder="Email" {...field}/>
                        </FormControl>
                    </FormItem>
                )}/>

                <FormField 
                control={form.control}
                name="password"
                render={({field}) =>(
                    <FormItem>
                        <FormControl>
                            <Input 
                                className='border w-full border-gray-700 p-5'
                                placeholder="Your Password" {...field}/>
                        </FormControl>
                    </FormItem>
                )}/>
                <Button type='submit' className='w-full py-5 text-black'>
                    Submit
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default SignupForm