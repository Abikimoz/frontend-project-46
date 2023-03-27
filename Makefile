install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintFix:
	npx eslint . --fix