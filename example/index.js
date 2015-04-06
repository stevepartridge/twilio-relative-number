var fancyHands = require('../src');

fancyHands.setup({
    TwilioSearchAccountSID   : 'Axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioSearchAuthToken    : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioPurchaseAccountSID : 'Axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    TwilioPurchaseAuthToken  : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  });

fancyHands.purchasePhoneNumberAsync({nearPhoneNumber: '+15551234567'})
  .then(function(purchasedNumber) {
    console.log('Yeay - I am proud owner of ' + purchasedNumber);
  })
  .catch(function(error) {
    console.error('Aw crap.');
    console.error(error);
  });