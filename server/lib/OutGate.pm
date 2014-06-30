package OutGate;


=pod
	Author: Nudelman Alex
			June 30, 2014
=cut




############# PRIVATE ######################

sub new{
	
	my $class = shift;
	my $this = {

		JSON  => new JSON() , 
	};
	bless $this;
	return $this;

	
}

sub DESTROY{
	
	my $this = shift;
	
	
}

sub DumpData{
	
	
	
	my $this = shift;
	my $data = shift;
	print "\n==========================\n";
	print Dumper($data);
	print "\n==========================\n";
	
}



############### GET ########################


############### SET ########################


############## JSON ########################


sub PrintJSONOut{
	
	my $this = shift;
	my $OUT = shift || {NODATA => 0, MSG=> 'ERROR - SOMETHING WENT WRONG !!!'}; 
	print "Content-type:application/json \n\n";
	print $this->{JSON}->pretty->encode($OUT);
}



1;
