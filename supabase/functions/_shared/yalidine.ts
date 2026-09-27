// Yalidine does not publish a universal public API contract. Configure a verified account endpoint
// in YALIDINE_API_BASE_URL and adapt this adapter to its documented response before enabling orders.
export async function getDeliveryTariff(wilaya: string, commune: string, deliveryType: 'home' | 'office') {
  const base = Deno.env.get('YALIDINE_API_BASE_URL')
  const apiId = Deno.env.get('YALIDINE_API_ID')
  const token = Deno.env.get('YALIDINE_API_TOKEN')
  if (!base || !apiId || !token) throw new Error('Delivery tariffs are not configured yet.')
  const response = await fetch(`${base.replace(/\/$/, '')}/deliveryfees?wilaya=${encodeURIComponent(wilaya)}&commune=${encodeURIComponent(commune)}&type=${deliveryType}`, { headers: { 'X-API-ID': apiId, 'X-API-TOKEN': token, Accept: 'application/json' } })
  if (!response.ok) throw new Error('Unable to retrieve the delivery tariff.')
  const data = await response.json()
  const fee = Number(data.delivery_fee ?? data[deliveryType === 'office' ? 'desk_fee' : 'home_fee'])
  if (!Number.isFinite(fee) || fee < 0) throw new Error('Yalidine returned an invalid delivery tariff.')
  return { fee, currency: data.currency || 'DZD' }
}
