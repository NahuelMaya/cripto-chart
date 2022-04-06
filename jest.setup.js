// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'

import 'jest-canvas-mock';

import { server } from './utils/tests/server'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})