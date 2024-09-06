import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withDrawalRequest } from '@/State/Withdrawal/Action';
import { getUserWallet } from '@/State/wallet/Action';
const WithdrawalForm = () => {
    const [amount, setAmount] = React.useState('');
    const dispatch = useDispatch();
    const { wallet, withdrawal } = useSelector(store => store);
    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(withDrawalRequest({ amount, jwt: localStorage.getItem('jwt') }));
        console.log(amount);
    };

    return (
        <div className='pt-10 space-y-5'>
            <div className='flex justify-between items-center rounded-md bg-green-400 text-xl font-bold px-5 py-4'>
                <p className='text-black'>Available Balance:</p>
                <p className='text-black'>${}</p>
            </div>
            <div className='flex flex-col items-center'>
                <h1>Enter withdrawal amount</h1>
                <div className='flex items-center justify-center'>
                    <Input
                        onChange={handleChange}
                        value={amount}
                        className='withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center'
                        placeholder='Amount'
                        type="number"
                    />
                </div>
            </div>
            <div>
                <p className='pb-2'>Transfer To</p>
                <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
                    <img className='h-8 w-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyx12BD2c5y91ak2WFo-KYJ3i54WpKQc-8Ug&s" alt="" />
                    <div>
                        <p className='text-xl font-bold'>{withdrawal.PaymentDetails?.bankName || 'N/A'}</p>
                        <p className='text-xs'>{withdrawal.PaymentDetails?.accountNumber || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <DialogClose className='w-full'>
                <Button onClick={handleSubmit} className='w-full py-7 text-xl font-bold text-black'>
                    WITHDRAW
                </Button>
            </DialogClose>
        </div>
    );
};

export default WithdrawalForm;