#!C:\Perl64\bin\perl

require 'D:\PUBLIC\�z�z�p\webpages\logic_circuit\log\cgi-lib.pl';
require  'D:\PUBLIC\�z�z�p\webpages\logic_circuit\log\jcode.pl';
use Encode;


&ReadParse(%in); # �A�z�z��form��FORM�^�O�̓��͂��i�[

$num = $ENV{'REMOTE_ADDR'};
$num  =~ s/\d+\.\d+\.\d+\.(\d+)/$1/;

$dat = $in{'dat'};
@lines = split(/\n/, $dat);

$step = $in{'step'};

$file = '>>D:\PUBLIC\�z�z�p\webpages\logic_circuit\log\dat\log.csv';
open (OUT, $file) or die "$!";
foreach $line (@lines){
    $line2 = encode('cp932', decode('utf8', $line));
    print OUT $num.",".$round.",".$line2."\n";
}
close(OUT);

print<<EOL;
Content-type: text/html

<html>
<head>
    <title>log</title>
</head>
<body>
</body>
</html>
EOL

__END__

