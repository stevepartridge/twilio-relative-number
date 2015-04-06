var
  twilio = require('twilio'),
  areacode = require('areacode'),
  twilioSearch,
  twilioPurchase
  ;

// Purchase specific number
// to be used with searchBy[Number|State]
function purchase(num, cb) {
  console.log('purchase', num);
  twilioPurchase.incomingPhoneNumbers.create({
    phoneNumber: num,
  }, function(err, number) {

    // If there's an error, throw it
    if(err) {
      return cb('Status: ' + err.status + ': ' + err.message);
    }
    console.log('purchased', number);

    cb(false, number.phone_number);

  });

}

// Search for a number by given state
// used as a fall back when an exising
// area code has been exhausted
function searchByState(state, cb) {

  twilioSearch.availablePhoneNumbers('US').local.get({
    inRegion: state
  }, function(err, data) {

    // If there's an error, throw it
    if(err) {
      return cb(err, false);
    }

    // If there is there is at least one number, use it.
    if(data.availablePhoneNumbers.length > 0) {
      purchase(data.availablePhoneNumbers[0].phone_number, cb);
      return;
    } else {
      // Otherwise, throw an error
      return cb('Unable to find number by state ' + state, false);
    }
  });
}

// Search for numbers relative to the
// provided 'num'. If one is not found,
// use the state derived from the provided
// number and fall back to searchByState
function searchByNumber(num, cb) {

  // Look up the info about the numbers' area code
  var info = areacode.byNumber(num);

  // Search twilio for numbers of the same area code
  twilioSearch.availablePhoneNumbers('US').local.get({
    areaCode: info.areacode
  }, function(err, data) {

    // If there's an error, throw it
    if(err) {
      return cb(err, false);
    }

    // If there is there is at least one number, use it.
    if(data.availablePhoneNumbers.length > 0) {
      purchase(data.availablePhoneNumbers[0].phone_number, cb);
    } else {
      // Otherwise, search by the state of the provided number
      searchByState(info.state_abbrv, cb);
    }
  });

}

var twilioRelativeNumber = {

  // Setup method for setting Twilio API credentials
  //
  // Example:
  //
  //   setup({
  //     TwilioSearchAccountSID   : 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //     TwilioSearchAuthToken    : 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //     TwilioPurchaseAccountSID : 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //     TwilioPurchaseAuthToken  : 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  //   })
  //
  setup : function(opts) {

    // Only create the twilioSearch client if both
    // the AccountSID and AuthToken are set
    if(opts.TwilioSearchAccountSID && opts.TwilioSearchAuthToken) {
      twilioSearch = twilio(opts.TwilioSearchAccountSID, opts.TwilioSearchAuthToken);
    }

    // Only create the twilioPurchase client if both
    // the AccountSID and AuthToken are set
    if(opts.TwilioPurchaseAccountSID && opts.TwilioPurchaseAuthToken) {
      twilioPurchase = twilio(opts.TwilioPurchaseAccountSID, opts.TwilioPurchaseAuthToken);
    }

  },

  // Purchase a new phone number relative to
  // provided 'nearPhoneNumber'
  //
  // Example:
  //
  //    purchasePhoneNumberAsync({nearPhoneNumber: '+1234567890'})
  //
  purchasePhoneNumberAsync : function(opts) {

    return new Promise(function(resolve, reject) {

      if(!opts) {
        throw new Error('No options where provided.');
      }

      if(!twilioSearch) {
        throw new Error('Twilio Search API Credentials are not set. Use setup() for this.');
      }

      if(!twilioPurchase) {
        throw new Error('Twilio Purchase API Credentials are not set. Use setup() for this.');
      }

      if(!opts.nearPhoneNumber) {
        throw new Error('opts.nearPhoneNumber is not set, please provide as {nearPhoneNumber: \'+1234567890\'}');
      }

      searchByNumber(opts.nearPhoneNumber, function(err, data){
        if(err) {
          return reject(err);
        }
        resolve(data);
      });

    });
  }
};

module.exports = twilioRelativeNumber;