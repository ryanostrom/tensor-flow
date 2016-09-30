# @description  run locally to clean cli, npm and bower dependencies
# @parameter  string  pass '-g' to reinstall current ember-cli version globally

function display() {
  echo "------>$1"
}

function getGlobalOption() {
  if [ $# -ge 1 ] && [ $1 = '-g' ]
  then
    resetGlobal=true
  else
    resetGlobal=false
  fi
}

function uninstallCli() {
  if $resetGlobal
  then
    display "Uninstalling CLI"
    npm uninstall -g ember-cli
  fi
}

function cleanDependencies() {
  display "Removing dependencies"
  rm -rf node_modules bower_components dist tmp vendor

  display "Cleaning npm cache"
  npm cache clean

  display "Cleaning bower cache"
  bower cache clean
}

function installCli() {
  if $resetGlobal
  then
    display "Installing CLI v1.13.15"
    npm install -g ember-cli@1.13.15
  fi
}

function installDependencies() {
  display "Installing npm dependencies"
  npm install

  display "Installing bower dependencies"
  bower install

  display "Installing gem dependencies"
  bundle
}

function build() {
  display "Building dist"
  ember build
}

getGlobalOption $1
uninstallCli
cleanDependencies
installCli
installDependencies
build
