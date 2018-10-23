process.env.NODE_ENV = 'test';

const proxyquire = require('proxyquire').noCallThru();
const path = require('path');
const callsite = require('callsite');

global.proxyquire = (module, stub) => proxyquire(path.join(path.dirname(callsite()[1].getFileName()), module), stub);

global.chai = require('chai');
global.dirtyChai = require('dirty-chai');
global.sinon = require('sinon');
global.sinonChai = require('sinon-chai');

global.chai.should();
global.expect = global.chai.expect;

global.chai.use(global.dirtyChai);
global.chai.use(global.sinonChai);
