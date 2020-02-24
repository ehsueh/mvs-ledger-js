#!/bin/bash
# Quick hack to run a customized output txn buffer
# Write the APDU packets of the corresponding txn

# Generate output according to the txn type (and write as output attachment)
# Note: two scripts modifications
# Encode to buffer and attach to header script as apdu packets fro the ledger

HEADER="apdu_load_device.txt"
USAGE="Usage: <output> <txn_out_buffer>"
PREFIX="E04A00003A00000000000000001976A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC"

if [ $# != 2 ] ; then
	echo $USAGE
	exit 1;
fi

output=$1
buffer=$2

cat $HEADER > $output
echo $PREFIX$buffer >> $output
