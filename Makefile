#########
# Setup #
#########

setup: install build

install:
	npm install

##########
# Build #
##########

## Build assets
build:
	npx encore dev

## Build production assets
build@production:
	npx encore production

## Build assets and watch
watch:
	npx encore dev --watch

serve:
	 php -S 0.0.0.0:8000 -t ./build

lint:
	npx eslint
