import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, json } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const auth = req.headers.get('Authorization') || ''
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const token = auth.replace('Bearer ', '')
    const { data: { user } } = await db.auth.getUser(token)
    const { data: admin } = user ? await db.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle() : { data: null }
    if (!admin) return json({ error: 'Unauthorized' }, 401)
    const { orderId } = await req.json()
    const { data: order, error } = await db.from('orders').select('*, products(id,currency), landing_pages(meta_pixel_id)').eq('id', orderId).single()
    if (error || !order) return json({ error: 'Order not found' }, 404)
    if (order.status !== 'delivered') return json({ error: 'Only delivered orders can generate Purchase.' }, 400)
    if (order.purchase_event_sent) return json({ sent: true, duplicate: true })
    const eventId = order.purchase_event_id || crypto.randomUUID()
    await db.from('orders').update({ purchase_event_id: eventId, purchase_conversion_status: 'pending', purchase_event_error: null }).eq('id', order.id).eq('purchase_event_sent', false)
    const pixel = order.landing_pages?.meta_pixel_id
    const accessToken = Deno.env.get('META_ACCESS_TOKEN')
    if (!pixel || !accessToken) throw new Error('Meta Purchase conversion is not configured.')
    const response = await fetch(`https://graph.facebook.com/v20.0/${pixel}/events?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{ event_name: 'Purchase', event_time: Math.floor(Date.now() / 1000), action_source: 'system_generated', event_id: eventId, custom_data: { content_ids: [order.product_id], content_type: 'product', value: Number(order.total_amount), currency: order.products.currency } }] }),
    })
    if (!response.ok) throw new Error(`Meta CAPI request failed (${response.status}).`)
    await db.from('orders').update({ purchase_event_sent: true, purchase_event_sent_at: new Date().toISOString(), purchase_conversion_status: 'sent', purchase_event_error: null }).eq('id', order.id).eq('purchase_event_sent', false)
    return json({ sent: true, eventId })
  } catch (error) {
    console.error('meta-purchase', error instanceof Error ? error.message : error)
    // A status change is preserved; this makes a failed conversion visible/retryable in the dashboard.
    return json({ error: error instanceof Error ? error.message : 'Meta conversion failed.' }, 502)
  }
})
