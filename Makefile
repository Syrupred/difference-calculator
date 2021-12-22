test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

install:
	npm ci
	


	 