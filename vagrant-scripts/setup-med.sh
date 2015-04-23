#!/bin/bash

mkdir /opt/medcellar
cp -R /vagrant/medcellar/* /opt/medcellar


cd /opt/medcellar
sudo rm -rf node_modules
sudo npm install
sudo grunt deployweak
