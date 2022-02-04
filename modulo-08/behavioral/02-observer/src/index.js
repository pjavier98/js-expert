import Payment from './events/payment.js';
import Marketing from './observers/marketing.js';
import Shipment from './observers/shipment.js';
import PaymentSubject from './subjects/paymentSubject.js';

const subject = new PaymentSubject();

const shipment = new Shipment()
subject.subscribe(shipment);

const marketing = new Marketing();
subject.subscribe(marketing);

const payment = new Payment(subject);

payment.creditCard({ username: 'PJ', id: Date.now() });

subject.unsubscribe(marketing);

payment.creditCard({ username: 'JP', id: Date.now() });

