import React from 'react';
import Tinkoff from 'react-tinkoff-pay'

const Payment = (props) => {
    console.log(props)
    const { id, amount, description } = props.payment
    console.log(amount)
    let form
    if(props.payment.amount !== null) {
        form = {
            terminalkey: '1615389548582',
            frame: 'false',
            language: 'ru',
            amount: amount.toString(),
            order: id.toString(),
            description: description.toString(),
        }
    }
    return (
        <div>
            {props.payment_init ? <Tinkoff.Pay form={form} onClose={() => console.log('close')} /> : null}
        </div>
    );
};

export default Payment;