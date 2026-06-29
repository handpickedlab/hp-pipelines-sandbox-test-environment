export async function GET(req) {
  // Lightweight health-check: no external dependencies, no auth
  const body = JSON.stringify({ status: 'ok' })
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
