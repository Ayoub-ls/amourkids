import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { fetchYalidineDeliveryFees, fetchYalidineCommunes } from './server/yalidine';
import { getStandardYalidineTariff } from './src/data/yalidineTariffs';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  /**
   * GET /api/yalidine/tariff
   * Query params:
   *  - wilaya / wilaya_id: numeric Wilaya code (1 - 58)
   *  - commune: name of the commune (optional / informational)
   *  - type: 'home' | 'office' (defaults to 'home')
   */
  app.get('/api/yalidine/tariff', async (req, res) => {
    try {
      const rawWilaya = req.query.wilaya || req.query.wilaya_id;
      const commune = typeof req.query.commune === 'string' ? req.query.commune.trim() : '';
      const deliveryType = (req.query.type === 'office' || req.query.type === 'desk') ? 'office' : 'home';

      if (!rawWilaya) {
        return res.status(400).json({
          success: false,
          error: 'Le paramètre wilaya ou wilaya_id est requis.',
        });
      }

      const numericWilaya = parseInt(String(rawWilaya), 10);
      if (isNaN(numericWilaya) || numericWilaya < 1 || numericWilaya > 58) {
        return res.status(400).json({
          success: false,
          error: `Code de wilaya invalide: "${rawWilaya}". Veuillez sélectionner une wilaya entre 1 et 58.`,
        });
      }

      // Fetch official delivery rates from Yalidine
      const fees = await fetchYalidineDeliveryFees(numericWilaya);

      // Determine active tariff based on delivery location choice
      let deliveryFee = 0;
      if (deliveryType === 'office') {
        deliveryFee = fees.desk_fee ?? fees.home_fee ?? 0;
      } else {
        deliveryFee = fees.home_fee ?? fees.desk_fee ?? 0;
      }

      return res.json({
        success: true,
        wilaya_id: numericWilaya,
        commune: commune || undefined,
        delivery_type: deliveryType,
        delivery_fee: deliveryFee,
        home_fee: fees.home_fee,
        desk_fee: fees.desk_fee,
        currency: 'DA',
      });
    } catch (err: any) {
      console.warn('[Yalidine Tariff Endpoint Notice]:', err?.message || err);

      const rawWilaya = req.query.wilaya || req.query.wilaya_id;
      const num = parseInt(String(rawWilaya), 10);
      const standard = getStandardYalidineTariff(!isNaN(num) ? num : 16);
      const deliveryType = (req.query.type === 'office' || req.query.type === 'desk') ? 'office' : 'home';
      const fee = deliveryType === 'office' ? standard.desk_fee : standard.home_fee;

      return res.json({
        success: true,
        wilaya_id: standard.wilaya_id,
        commune: typeof req.query.commune === 'string' ? req.query.commune.trim() : undefined,
        delivery_type: deliveryType,
        delivery_fee: fee,
        home_fee: standard.home_fee,
        desk_fee: standard.desk_fee,
        currency: 'DA',
      });
    }
  });

  /**
   * GET /api/yalidine/communes
   * Query params:
   *  - wilaya_id / wilaya: numeric Wilaya code (1 - 58)
   */
  app.get('/api/yalidine/communes', async (req, res) => {
    try {
      const rawWilaya = req.query.wilaya_id || req.query.wilaya;
      if (!rawWilaya) {
        return res.status(400).json({
          success: false,
          error: 'Le paramètre wilaya_id est requis.',
        });
      }

      const numericWilaya = parseInt(String(rawWilaya), 10);
      if (isNaN(numericWilaya) || numericWilaya < 1 || numericWilaya > 58) {
        return res.status(400).json({
          success: false,
          error: 'Code de wilaya invalide.',
        });
      }

      const communes = await fetchYalidineCommunes(numericWilaya);
      return res.json({
        success: true,
        wilaya_id: numericWilaya,
        communes,
      });
    } catch (err: any) {
      console.error('[Yalidine Communes Endpoint Error]:', err?.message || err);
      return res.status(500).json({
        success: false,
        error: 'Impossible de récupérer la liste des communes.',
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
