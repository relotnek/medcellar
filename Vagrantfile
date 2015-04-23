# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

##########Setup Vulnerable Test App ###########

  config.vm.define :medcellar do |app|
    app.vm.box = "phusion/ubuntu-14.04-amd64"

    app.vm.provider "virtualbox" do |v|
        #v.gui = true
        v.name = "MedCellar Development"
    end

    app.vm.network "private_network", ip: "192.168.123.10"
    app.vm.network :forwarded_port, guest:3000, host:3000
    app.vm.network :forwarded_port, guest:443, host:3001
    app.vm.provision "shell", path: "vagrant-scripts/prepare-med.sh"
    app.vm.provision "shell", path: "vagrant-scripts/setup-med.sh"
  end
end