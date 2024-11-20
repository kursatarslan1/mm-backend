#!/bin/bash

# Java'yı yükle
sudo apt-get update -y
sudo apt-get install -y openjdk-11-jdk

# JAVA_HOME ortam değişkenini ayarla
export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

# Node-gyp ve diğer bağımlılıkları yükle
sudo apt-get install -y build-essential python3

# Bağımlılıkları yükle
yarn install --frozen-lockfile
