import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./dashboard/AuthContext";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import DashboardLayout from "./dashboard/DashboardLayout";
import Login from "./dashboard/Login";
import OrdersPage from "./dashboard/OrdersPage";

import EngBook from './landing-pages/engbook/engbook.jsx'
import EngProb from './landing-pages/engbook/engprob.jsx'

import ManBafProb from './landing-pages/speakerphone/man-baf/cleanprob.jsx'
import ManBafBook from './landing-pages/speakerphone/man-baf/cleanbook.jsx'
import ManConnectorProb from './landing-pages/speakerphone/man-connector/cleanprob.jsx'
import ManConnectorBook from './landing-pages/speakerphone/man-connector/cleanbook.jsx'
import ManDurtyenvProb from './landing-pages/speakerphone/man-durtyenv/cleanprob.jsx'
import ManDurtyenvBook from './landing-pages/speakerphone/man-durtyenv/cleanbook.jsx'
import WomanConnectbafProb from './landing-pages/speakerphone/woman-connectbaf/cleanprob.jsx'
import WomanConnectbafBook from './landing-pages/speakerphone/woman-connectbaf/cleanbook.jsx'
import WomanKidsProb from './landing-pages/speakerphone/woman-kids/cleanprob.jsx'
import WomanKidsBook from './landing-pages/speakerphone/woman-kids/cleanbook.jsx'
import WomanMakeupBook from './landing-pages/speakerphone/woman-makeup/cleanbook.jsx'
import WomanMakeupProb from './landing-pages/speakerphone/woman-makeup/cleanprob.jsx'
import WomanCleangirlBook from './landing-pages/speakerphone/woman-cleangirl/cleanbook.jsx'
import WomanCleangirlProb from './landing-pages/speakerphone/woman-cleangirl/cleanprob.jsx'
import WomanTravelBook from './landing-pages/speakerphone/woman-travel/cleanbook.jsx'
import WomanTravelProb from './landing-pages/speakerphone/woman-travel/cleanprob.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* English words book funnel */}
        <Route path="/engprob" element={<EngProb ctaHref="/engprob/engbook" />} />
        <Route path="/engprob/engbook" element={<EngBook backHref="/engprob" />} />

        {/* Cleaning kit funnel - one route pair per avatar/ad creative */}
        <Route path="/kit/man-baf" element={<ManBafProb ctaHref="/kit/man-baf/order" />} />
        <Route path="/kit/man-baf/order" element={<ManBafBook backHref="/kit/man-baf" />} />

        <Route path="/kit/man-connector" element={<ManConnectorProb ctaHref="/kit/man-connector/order" />} />
        <Route path="/kit/man-connector/order" element={<ManConnectorBook backHref="/kit/man-connector" />} />

        <Route path="/kit/man-durtyenv" element={<ManDurtyenvProb ctaHref="/kit/man-durtyenv/order" />} />
        <Route path="/kit/man-durtyenv/order" element={<ManDurtyenvBook backHref="/kit/man-durtyenv" />} />

        <Route path="/kit/woman-connectbaf" element={<WomanConnectbafProb ctaHref="/kit/woman-connectbaf/order" />} />
        <Route path="/kit/woman-connectbaf/order" element={<WomanConnectbafBook backHref="/kit/woman-connectbaf" />} />

        <Route path="/kit/woman-kids" element={<WomanKidsProb ctaHref="/kit/woman-kids/order" />} />
        <Route path="/kit/woman-kids/order" element={<WomanKidsBook backHref="/kit/woman-kids" />} />

        <Route path="/kit/woman-makeup" element={<WomanMakeupProb ctaHref="/kit/woman-makeup/order" />} />
        <Route path="/kit/woman-makeup/order" element={<WomanMakeupBook backHref="/kit/woman-makeup" />} />

        <Route path="/kit/woman-cleangirl" element={<WomanCleangirlProb ctaHref="/kit/woman-cleangirl/order" />} />
        <Route path="/kit/woman-cleangirl/order" element={<WomanCleangirlBook backHref="/kit/woman-cleangirl" />} />

        <Route path="/kit/woman-travel" element={<WomanTravelProb ctaHref="/kit/woman-travel/order" />} />
        <Route path="/kit/woman-travel/order" element={<WomanTravelBook backHref="/kit/woman-travel" />} />

        {/* Default landing + catch-all: pick ONE fallback, not one per product */}
        <Route path="/" element={<Navigate to="/engprob" replace />} />
        <Route path="*" element={<Navigate to="/engprob" replace />} />
        <Route path="/dashboard/login" element={
          <AuthProvider><Login /></AuthProvider>
        } />
        <Route path="/dashboard" element={
          <AuthProvider>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </AuthProvider>
        }>
          <Route index element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
