install:
	npm ci

run1:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

run2:
	node bin/gendiff.js file1.json file2.json

test:
	npm test

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintFix:
	npx eslint . --fix