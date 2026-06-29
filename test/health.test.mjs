import assert from 'assert'
import { GET } from '../app/health/route.js'

// Construct a minimal Request for the route handler
const req = new Request('http://localhost/health', { method: 'GET' })

// Measure elapsed time to ensure handler is fast (<200ms)
const start = Date.now()
const res = await GET(req)
const elapsed = Date.now() - start
assert(elapsed < 200, `health check too slow: ${elapsed}ms`)

// Status code
assert.strictEqual(res.status, 200, 'expected status 200')

// Content-Type header should include application/json (charset allowed)
const contentType = res.headers.get('content-type') || ''
assert(
  contentType.includes('application/json'),
  `expected Content-Type to include application/json but got: ${contentType}`
)

// Body should be exactly { "status": "ok" }
const text = await res.text()
let parsed
try {
  parsed = JSON.parse(text)
} catch (err) {
  throw new Error(`response body is not valid JSON: ${text}`)
}
assert.deepStrictEqual(parsed, { status: 'ok' })

console.log('health route test passed')
