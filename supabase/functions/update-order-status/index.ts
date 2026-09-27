import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, json } from '../_shared/cors.ts'

const valid = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned']
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  try {
    const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '')
    const { data: { user } } = await db.auth.getUser(jwt)
    const { data: admin } = user ? await db.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle() : { data: null }
    if (!admin) return json({ error: 'Unauthorized' }, 401)
    const { orderId, status } = await req.json()
    if (!orderId || !valid.includes(status)) return json({ error: 'Invalid order status.' }, 400)
    const update: Record<string, unknown> = { status }
    if (status === 'delivered') update.delivered_at = new Date().toISOString()
    const { data: order, error } = await db.from('orders').update(update).eq('id', orderId).select().single()
    if (error) throw error
    if (status !== 'delivered' || order.purchase_event_sent) return json({ order, conversion: 'not_required' })
    const capi = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/meta-purchase`, { method: 'POST', headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId }) })
    const result = await capi.json().catch(() => ({}))
    if (!capi.ok) {
      await db.from('orders').update({ purchase_conversion_status: 'failed', purchase_event_error: result.error || 'Meta conversion failed.' }).eq('id', orderId)
      return json({ order, conversion: 'failed', conversionError: result.error || 'Meta conversion failed. It can be retried.' }, 202)
    }
    return json({ order, conversion: result.duplicate ? 'already_sent' : 'sent' })
  } catch (error) { return json({ error: error instanceof Error ? error.message : 'Unable to update order.' }, 500) }
})
