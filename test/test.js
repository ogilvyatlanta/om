
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();


describe('Create a new envirnoment',function(){
    
    var om = require('../lib');
    
    it('om should be a function',function(){
        expect(om).to.be.a('function');
    });

    it('om should return an object', function() {
        expect(om()).to.be.a('object');
    });

});