package DatabaseManager;

use Data::Dumper;
use DBI;

=pod
	Author: Nudelman Alex
			June 30, 2014
=cut


###############################################################
# private connection can be used only by/from the class  
###############################################################
my $connector = sub {


        my $user = shift;
        my $pass = shift;

        $user = 'username' unless $user;
        $pass = 'userpassword' unless $pass;

        my $db = DBI->connect( "DBI:SQLite:", $user, $pass ) or die "can't connect ==> $!";
        return $db;
        
           


};



############# PRIVATE ######################

sub new{
	
	my $class = shift;
	my $user = shift ||0;
	my $pass = shift ||0;
	
	my $this = {
	 DB                      => $connector->($user,$pass),
	 STH                     => undef,
	};
	bless $this;
	return $this;

	
}

sub DESTROY{
	
	my $this = shift;
	$this->{DB}->disconnect();
	
}

sub DumpData{
	
	
	
	my $this = shift;
	my $data =shift;
	print "\n==========================\n";
	print Dumper($data);
	print "\n==========================\n";
	
}



############### GET ########################


sub GetDBData{

#
#  This function receives sqlquery and <fetch by > json key default value = "id" (*** note : key must be unique otherwise it will be overrated )
#  function will return hash/json :
#      
#      key => {  row as object }
#    
#  if type is array return will be array of objects (can be sorted by sql query) :   [  {object1}, {object2}, {object3} ...] 
#
    
    my $this = shift;
    
    my $sqlquery = shift;
    my $fetch_by = shift;
    my $type = shift;
    
    return unless $sqlquery;
    
   
     
    $this->{STH} = $this->{DB}->prepare($sqlquery) || sub{ warn("WRONG QUERY: $sqlquery");  die($!)}->();
    $this->{STH}->execute() || sub{ warn("\n CDBM::WRONG QUERY: $sqlquery\n");  die($!)}->();
    
#   unless($this->{STH}->rows)
#   {
#       my @cols = @{$this->{STH}->{NAME_lc}}; # or NAME if needed
#       my %empty =  map {$_ => ""} @cols ;
#       return \%empty;
#   }
    my $temp = 0 ;
    if(uc($type) eq 'ARRAY')
    {
      $temp = $this->{STH}->fetchall_arrayref({});
    }else{
      
      $fetch_by = 'id' unless $fetch_by;
      $temp = $this->{STH}->fetchall_hashref($fetch_by);
    
    }
    
    $this->{STH}->finish();
    return $temp;
    
}

sub GetDBDataArray{
	
	my $this = shift;
	my $sqlquery = shift;
	
	return unless $sqlquery;
	
	$this->{STH} = $this->{DB}->prepare($sqlquery) || die($!);
	$this->{STH}->execute()|| die($!);

	my $temp = $this->{STH}->fetchall_arrayref({});
	$this->{STH}->finish();
	return $temp;
	
}

##########################################################
# NRT Pattern  skip data structure and work while we have
# available data via looping db
# do not forget to finish and DO NOT CLOSE connection  
#########################################################
sub GetExecDBHandler{
 
  my $this = shift;
  my $sqlquery = shift;
  return 0 unless $sqlquery;
  
  $this->{STH} = $this->{DB}->prepare($sqlquery) || die($!);
  $this->{STH}->execute()|| die($!);
  return  $this->{STH};
    
 
}

############### SET ########################

sub InsertDBData{
 
 	my $this = shift;
	my $sqlquery = shift;
	my $insertid = 0;
	
	return unless $sqlquery;
	
	$this->{STH} = $this->{DB}->prepare($sqlquery) || die($!);
	$this->{STH}->execute() || die($!);
	$insertid = $this->{STH}->{mysql_insertid};
	$this->{STH}->finish();
	return $insertid; 
 
}



1;
