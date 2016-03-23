all:
	jpm run

# Build the addon
xpi:
	jpm xpi

xpcom:
	jpm -b $(FIREFOX_DEV) run

# Load a clean Firefox profile and the addon
run:
	jpm run
