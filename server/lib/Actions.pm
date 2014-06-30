package Actions;



use warnings;
use strict;
use Data::Dumper;
use DBI;
use Time::HiRes qw(time);

=pod
	Author: Nudelman Alex
			June 30, 2014
=cut


use lib './lib';
use DatabaseManager;
use OutGate;


############# PRIVATE ######################

sub new{
	
	my $class = shift;
	my $user = shift ||0;
	my $pass = shift ||0;
	
	my $this = {

		DBM => new DatabaseManager(),
		OG  => new OutGate(),
		

	};
	
	bless $this;
	$this->MapRoutingFunctions();
	return $this;

	
}

sub DESTROY{
	
	my $this = shift;

	
}

sub DumpData{
	
	
	
	my $this = shift;
	my $data =shift;
	print "\n==========================\n";
	print Dumper($data);
	print "\n==========================\n";
	
}

sub MapRoutingFunctions{

 my $this = shift;

 $this->{FUNCTIONS} = {
  
   'ACTION_TEST' => sub { $this->ActionTest1 },
#	'ACTION_TEST2' => sub { $this->ActionTest2 }, 
    
        
 };

}

sub GetServerBasicInfo{

	my $this = shift;

	my $init_time = shift || 0;
	my $time  = time();
	
	return {

		'SERVER_TIME' => $time,
		'RESPONSE_TIME' => sprintf( "%.5f",($time - $init_time)),
		'VCARD' => 'Pet Project Rest Service v1.0',
		'USER' => 'some user name',
		'REMOTE_ADDRESS' => '8.8.8.8' ### test
 
	};

}

############### ACTIONS ########################

sub ActionTest1{

	my $this = shift;
	my $T1   = time();


	my $data  = {}; 
	
	$data->{DATA} = {'test1'=> 33333, 'bla bla '=> 'ddddddd'};
	$data->{INFO} = $this->GetServerBasicInfo($T1);
	$this->{OG}->PrintJSONOut($data);

}

sub ActionTest2{
	
	my $this = shift;
	my $T1   = time();

	my $data  = {}; 

	$data->{DATA} = {'test2'=> 33333};
	$data->{INFO} = $this->GetServerBasicInfo($T1);
	$this->{OG}->PrintJSONOut($data);

}

sub RouteAction{

	my $this   = shift;
	my $REQUEST = shift || return;
	
	my $T1 = time();
	$this->{FUNCTIONS}->{uc($REQUEST->{VERB})}->() if($this->{FUNCTIONS}->{uc($REQUEST->{VERB})});

}



1;
