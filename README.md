# Twilio Relative Number Search
Basic app to search for relative numbers based on areacode location.  If the areacode is exhausted, it will fall back to a nearby one.

### Development

Pull down this repository and within the root path run:

    npm install 
    

##### Example

Open up the file [example/index.js](https://github.com/stevepartridge/twilio-relative-number/blob/master/example/index.js)

* Edit the Twilio Search and Purchase [AccountSID/AuthTokens](https://github.com/stevepartridge/twilio-relative-number/blob/master/example/index.js#L4-L7)
* Change the [phone number](https://github.com/stevepartridge/twilio-relative-number/blob/master/example/index.js#L10) to a real one 

Then run:

    node example/index.js


### Tests

There are minimal tests, but to run them use:

    make test
    
##### Dependencies 

This does leverage a non-published npm package [Areacode (US)](https://github.com/stevepartridge/areacode-us-js)
