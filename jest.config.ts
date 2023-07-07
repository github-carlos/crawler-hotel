import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: ["tests"],
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@business/(.*)$": "<rootDir>/src/business/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
  }
};

export default jestConfig