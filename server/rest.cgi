
#!/usr/bin/perl

=pod
	Author: Nudelman Alex
			Jun 26, 2014 
=cut

use warnings;
use strict;
use CGI;
# use CGI::Carp qw(fatalsToBrowser);

use JSON;
use Time::HiRes qw(time);

use lib './lib';
use Actions;




my $debug =1;



################ Debug Tools ################

sub Debug{

	my $str = shift;

	return unless $debug;
	print "DEBUG :::>  $str \n"; 

}

sub PrintPosted{
	
	my $data  = shift;
	print "Content-type: text/html\n\n";
	
	print '<br>######################################<br><br>';
	foreach my $key (keys %$data){
		
		print $key.' ==> '.$data->{$key}.'<br>';
		
	}
	print '<br>######################################<br><br>';
}




############### Main ########################

sub main{
 
 
my $cgi = new CGI();

my $REQUEST = {

	METHOD         => $cgi->request_method(),
	REMOTE_ADDRESS => $cgi->remote_addr(),
	CONTENT_TYPE   => $cgi->content_type(),
	VERB           => $cgi->param('v') ||  'none',

};


##### main executer 
my $ACTIONS = new Actions();
$ACTIONS->RouteAction($REQUEST);
	
}


main();