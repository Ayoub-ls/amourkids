import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, json } from '../_shared/cors.ts'
import { getDeliveryTariff } from '../_shared/yalidine.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const input = await req.json()
    const required = ['landingPageId', 'productId', 'customerName', 'phone', 'wilaya', 'commune', 'deliveryType', 'idempotencyKey']
    if (required.some((key) => !input[key])) return json({ error: 'Missing required order fields.' }, 400)
    if (!['home', 'office'].includes(input.deliveryType) || !Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 50) return json({ error: 'Invalid order data.' }, 400)
    if (String(input.customerName).trim().length < 2 || String(input.phone).replace(/\s/g, '').length < 8) return json({ error: 'Invalid customer details.' }, 400)
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: existing } = await db.from('orders').select('*').eq('idempotency_key', input.idempotencyKey).maybeSingle()
    if (existing) return json({ order: existing })
    const { data: page, error: pageError } = await db.from('landing_pages').select('id,product_id,active').eq('id', input.landingPageId).single()
    if (pageError || !page?.active || page.product_id !== input.productId) return json({ error: 'This landing page is unavailable.' }, 400)
    const { data: product, error: productError } = await db.from('products').select('id,price,currency,active').eq('id', input.productId).single()
    if (productError || !product?.active) return json({ error: 'This product is unavailable.' }, 400)
    const tariff = await getDeliveryTariff(String(input.wilaya), String(input.commune), input.deliveryType)
    const productPrice = Number(product.price)
    const quantity = Number(input.quantity)
    const total = productPrice * quantity + tariff.fee
    const browserEventId = crypto.randomUUID()
    const { data: order, error } = await db.from('orders').insert({
      landing_page_id: page.id, product_id: product.id, customer_name: String(input.customerName).trim(), phone: String(input.phone).trim(),
      wilaya: String(input.wilaya).trim(), commune: String(input.commune).trim(), address: input.address ? String(input.address).trim() : null,
      quantity, product_price: productPrice, delivery_fee: tariff.fee, total_amount: total, delivery_type: input.deliveryType,
      browser_event_id: browserEventId, idempotency_key: input.idempotencyKey,
    }).select().single()
    if (error) throw error
    return json({ order: { ...order, currency: product.currency } }, 201)
  } catch (error) {
    console.error('create-order', error instanceof Error ? error.message : error)
    return json({ error: error instanceof Error ? error.message : 'Order creation failed.' }, 500)
  }
})
