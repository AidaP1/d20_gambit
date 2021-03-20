const assert = require('assert');
const Opponent = require('../main');

describe ('Opponent',() => {
    describe('.taunt', ()=> {
        it('returns a string', () => {
            const type = 'string';
            
            const testOpp = new Opponent();
            const actual = testOpp.taunt();
            const actType = typeof(actual);

            assert.strictEqual(actType,type);
        });
    });
});