<?php
#connect on localhost for user 'root'
$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

#set encoding o match php script encoding.
mysqli_set_charset( $dbc , 'utf8');
/*
if( mysqli_ping($dbc)){
        echo 'MySQL Server' . mysqli_get_server_info($dbc).
        'on' . mysqli_get_host_info($dbc);
}*/
