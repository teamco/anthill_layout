

RUN: perl rest.cgi v=action_test > ./t/test2.t




OUT:


Content-type:application/json 

{
   "INFO" : {
      "REMOTE_ADDRESS" : "8.8.8.8",
      "RESPONSE_TIME" : "0.00000",
      "SERVER_TIME" : 1404140951.0141,
      "USER" : "some user name",
      "VCARD" : "Pet Project Rest Service v1.0"
   },
   "DATA" : {
      "test1" : 33333,
      "bla bla " : "ddddddd"
   }
}
