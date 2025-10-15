module.exports = {
    //Test environment
    testEnvironment: 'jsdom',

    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

    //test file patterns
    testMatch: [
        '<rootDir>/tests/**/*.test.js',
        '<rootDir>/tests/**/*.spec.js',
    ],

    //coverage collection
    collectCoverageForm: [
        // 'src/script/*.js',
        'src/script/**/*.js',
        '!src/script/**/*.test.js',
        '!src/script/**/*.spec.js',
    ],

    //Ignore patterns
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/cypress'
    ],

    coverageThreshold: {
        global: {
            branches: 70,
            functions:70,
            lines: 70,
            statements: 70
        }
    },

    //coverage output
    coverageDirectory: 'test-reports/coverage',
    coverageReporters: ['text', 'html', 'lcov'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@script/(.*)$': '<rootDir>/src/script/$1'
    },

    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};