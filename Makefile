.DEFAULT_GOAL=help

REGION=eu-central-1

.PHONY: help
help:
	@echo 'Usage: make <target>'
	@echo 'targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



.PHONY: getoutputs
getoutputs:  ## getoutputs from stacks
	./scripts/outputconfig.sh ${REGION}

.PHONY: buildsite
buildsite:  getoutputs ## build site
	NODE_OPTIONS=--openssl-legacy-provider npm run build

.PHONY: uploadsite
uploadsite:  ## upload site
	./scripts/uploadsite.sh ${REGION}

.PHONY: buildandupload
buildandupload: |  buildsite uploadsite ## build and upload site

.PHONY: selfregisterenable
selfregisterenable:  ## allow users to self register
	./scripts/adminonlyregister.sh ${REGION} False

.PHONY: selfregisterdisable
selfregisterdisable:  ## disallow users to self register
	./scripts/adminonlyregister.sh ${REGION} True

