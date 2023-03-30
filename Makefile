install:
	npm ci

run:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintFix:
	npx eslint . --fix