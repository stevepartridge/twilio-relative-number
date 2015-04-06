var
  should = require('chai').should(),
  fancyHands = require('../src')
  ;

describe('#purchasePhoneNumberAsync', function() {
  it('fails due to lack of setup info', function() {
    fancyHands.purchasePhoneNumberAsync({nearPhoneNumber: '+12120987654'})
      .then(function(purchasedNumber){
        should.not.exist(purchasedNumber);
      })
      .catch(function(error){
        should.exist(error);
      });
  });

  // Set fake twilio data to add more test coverage
  fancyHands.setup({
    TwilioSearchAccountSID   : 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioSearchAuthToken    : 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioPurchaseAccountSID : 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioPurchaseAuthToken  : 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  });

  it('fails due to invalid twilio info', function() {
    fancyHands.purchasePhoneNumberAsync({nearPhoneNumber: '+12120987654'})
      .catch(function(error){
        should.exist(error);
      });
  });
});