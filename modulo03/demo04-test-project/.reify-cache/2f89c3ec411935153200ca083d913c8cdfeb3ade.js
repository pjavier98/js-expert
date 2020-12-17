"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('./../src/person.js',{default(v){Person=v}},2);



const { describe, it } = mocha;
const { expect } = chai;

describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '2 Bike,Aviao,Navio 200000 2000-01-01 2002-02-01',
        );

        const expected = {
            from: '2000-01-01',
            to: '2002-02-01',
            vehicles: ['Bike', 'Aviao' , 'Navio'],
            kmTraveled: '200000',
            id: '2',
        };

        expect(person).to.be.deep.equal(expected);
    });

    it('should format values', () => {
        const person = new Person({
            id: '2',
            vehicles: ['Bike', 'Aviao' , 'Navio'],
            kmTraveled: '200000',
            from: '2000-01-01',
            to: '2002-02-01',
        });

        const result = person.formatted('pt-BR');
        const expected = {
            id: 2,
            vehicles: 'Bike, Aviao e Navio',
            kmTraveled: '200.000 km',
            from: '01 de janeiro de 2000',
            to: '01 de fevereiro de 2002'
        };

        expect(result).to.be.deep.equal(expected);
    });
});
