#!/bin/bash

openssl req -new -x509 -key key.pem -out cert.pem -days 365
cp key.pem key.pem.org
openssl rsa -in key.pem.orig -out key.pem