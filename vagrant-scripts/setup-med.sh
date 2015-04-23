#!/bin/bash

mkdir /opt/medcellar
cp -R /vagrant/nodecellar/* /opt/medcellar


cd /opt/medcellar
sudo rm -rf node_modules
sudo npm install
sudo grunt deployweak
