export default class Payment {
    constructor(paymentSubject) {
        this.paymentSubject = paymentSubject;
    }

    creditCard(paymentData)  {
        console.log(`\na payment occurred from ${paymentData.username}`);
        this.paymentSubject.notify(paymentData);
    }
}