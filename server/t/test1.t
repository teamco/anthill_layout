

RUN: 

perl rest.cgi v=action_test



OUTPUT:

Content-type:application/json 

{
   "INFO" : {
      "REMOTE_ADDRESS" : "8.8.8.8",
      "SERVER_TIME" : 1404139225.88035,
      "USER" : "some user name",
      "VCARD" : "Pet Project Rest Service v1.0"
   },
   "DATA" : {
      "test1" : 33333,
      "bla bla " : "ddddddd"
   }
}
