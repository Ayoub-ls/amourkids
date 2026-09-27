import { corsHeaders, json } from '../_shared/cors.ts'
import { getDeliveryTariff } from '../_shared/yalidine.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const { wilaya, commune, deliveryType } = await req.json()
    if (!wilaya || !commune || !['home', 'office'].includes(deliveryType)) return json({ error: 'Invalid delivery request.' }, 400)
    const tariff = await getDeliveryTariff(String(wilaya), String(commune), deliveryType)
    return json({ success: true, wilaya_id: Number(wilaya), commune, delivery_type: deliveryType, delivery_fee: tariff.fee, home_fee: deliveryType === 'home' ? tariff.fee : null, desk_fee: deliveryType === 'office' ? tariff.fee : null, currency: tariff.currency })
  } catch (error) { return json({ error: error instanceof Error ? error.message : 'Tariff request failed.' }, 502) }
})
