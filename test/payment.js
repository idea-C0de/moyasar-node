import assert from 'assert';
import fs from 'fs';
import Moyasar from '../src/moyasar.js';

let config = JSON.parse(fs.readFileSync('./test.config.json'));
describe('Payment API', ()=>{

    let moyasar = new Moyasar(config.ApiKey)

    it('Get All Payments',done=>{

        moyasar.payment.list().then(payments=>{
            assert.equal(Array.isArray(payments),true);
            done();
        });
    });


    it('Make a payment',done=>{

        moyasar.payment.create({
            amount:700,
            currency:'SAR',
            description: 'bag payment',
            source:{
                type:'creditcard',
                name:'Abdulaziz Nasser',
                number:4111111111111111,
                cvc:331,
                month:12,
                year:2017
            }
        }).then(p=>{
            assert.ok(p.id);
            done();
        });

    });

    it('Retreive a payment',done=>{
        moyasar.payment.fetch(config.test.paymentId).then(p=>{
            assert(p.id);
            done();
        });
    });

    it('Retreive a payment and refund it',done=>{
        moyasar.payment.fetch(config.test.paymentId).then(p=>{
            return moyasar.payment.refund(p).then(r=>{
                assert(r.id);
                done();
                return r;
            });
        })
    })

});
