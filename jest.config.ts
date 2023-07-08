const jestConfig = {
  preset: 'ts-jest',
  roots: ["src"],
  testMatch: [
    '**/*.spec.ts',    // Padrão para arquivos de teste unitários
    '**/*.e2e.ts',  
  ],
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@business/(.*)$": "<rootDir>/src/business/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
  }
};

export default jestConfig