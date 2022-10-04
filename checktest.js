const checksum_lib =require('paytmchecksum')

var paytmchecksum = ''; 

var paytmParams  = {}

const received_data = JSON.parse('{}');
for (var key in received_data) {
    if (key == 'CHECKSUMCASH') {
        paytmchecksum= received_data[key];
    }
    else{
        paytmParams[key] = received_data[key]
    }        
}

var isValidChecksum = checksum_lib.verifySignature(paytmParams , "" ,paytmchecksum)
if (isValidChecksum) {
    console.log("checksum matched");
}
else{
    console.log("Checksum Mismatched");
}