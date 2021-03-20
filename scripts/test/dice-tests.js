const assert = require('assert');
const DiceRoller = require('../dice-roller');

describe('DiceRoller', () => {
    describe('.d4', () => {
        it('is a number integer >= 1 and <= 4', () => {
            const type = 'number';
            const upperLimit = 4;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d4();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d4();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d4(),highestNum)
            }
            let lowestNum = DiceRoller.d4();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d4(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
    describe('.d6', () => {
        it('is a number integer >= 1 and <= 6', () => {
            const type = 'number';
            const upperLimit = 6;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d6();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d6();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d6(),highestNum)
            }
            let lowestNum = DiceRoller.d6();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d6(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
    describe('.d8', () => {
        it('is a number integer >= 1 and <= 8', () => {
            const type = 'number';
            const upperLimit = 8;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d8();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d8();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d8(),highestNum)
            }
            let lowestNum = DiceRoller.d8();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d8(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
    describe('.d10', () => {
        it('is a number integer >= 1 and <= 10', () => {
            const type = 'number';
            const upperLimit = 10;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d10();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d10();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d10(),highestNum)
            }
            let lowestNum = DiceRoller.d10();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d10(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
    describe('.d12', () => {
        it('is a number integer >= 1 and <= 12', () => {
            const type = 'number';
            const upperLimit = 12;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d12();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d12();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d12(),highestNum)
            }
            let lowestNum = DiceRoller.d12();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d12(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
    describe('.d20', () => {
        it('is a number integer >= 1 and <= 20', () => {
            const type = 'number';
            const upperLimit = 20;
            const lowerLimit = 1;


            const funcTest = DiceRoller.d20();
            const actType = typeof(funcTest);
            let highestNum = DiceRoller.d20();
            for (let i = 0; i < 20; i++) {
                highestNum = Math.max(DiceRoller.d20(),highestNum)
            }
            let lowestNum = DiceRoller.d20();
            for (let i = 0; i < 20; i++) {
                lowestNum = Math.max(DiceRoller.d20(),lowestNum)
            }
            

            assert.strictEqual(actType,type);
            assert.ok(highestNum <= upperLimit);
            assert.ok(lowestNum >= lowerLimit);
            assert.ok(Number.isInteger(funcTest))
        });
    });
});