import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useEffect } from 'react';
import PaymentDetailsForm from './PaymentDetailsForm';
import { Button } from '@/components/ui/button';
import { getPaymentDetails } from '@/State/Withdrawal/Action';
import { useDispatch, useSelector } from 'react-redux';

const PaymentDetails = () => {
  const { withdrawal } = useSelector(store => store);
  const dispatch = useDispatch();

  // Fetch payment details on component mount
  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem('jwt') }));
  }, [dispatch]);

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">
        Payment Details
      </h1>

      {withdrawal.paymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle>{withdrawal.paymentDetails?.bankName}</CardTitle>
            <CardDescription>A/C No : {withdrawal.paymentDetails?.accountNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder</p>
              <p className="text-gray-400">: {withdrawal.paymentDetails?.accountHolderName}</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400">: {withdrawal.paymentDetails?.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger className="py-2">
            <Button className="py-6">Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
