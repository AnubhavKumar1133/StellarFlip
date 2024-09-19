import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addPaymentDetails } from '@/State/Withdrawal/Action';
import { Input } from '@/components/ui/input';

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: ""
    }
  });

  const onSubmit = (data) => {
    // Check if account numbers match
    if (data.accountNumber !== data.confirmAccountNumber) {
      alert("Account numbers do not match!");
      return;
    }

    // Dispatch action to add payment details
    dispatch(addPaymentDetails({
      paymentDetails: {
        accountNumber: data.accountNumber,
        accountHolderName: data.accountHolderName,
        ifsc: data.ifsc,
        bankName: data.bankName,
      },
      jwt: localStorage.getItem('jwt'),
    }));

    // Reset form after successful submission
    form.reset();
    console.log(data);
  };

  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Account Holder Name */}
          <FormField 
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Account holder name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* IFSC Code */}
          <FormField 
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="IFSC Code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Account Number */}
          <FormField 
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="*********2343" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Confirm Account Number */}
          <FormField 
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="confirm account number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Bank Name */}
          <FormField 
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Yes Bank" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full py-5 text-black">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
