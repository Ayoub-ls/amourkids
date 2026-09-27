import { useEffect, useState } from "react";
import { supabase } from "../shared/supabaseClient";

// Short beep using the Web Audio API, so we don't need an audio file asset.
function playBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Autoplay can be blocked before the user has interacted with the page — that's fine, just skip the sound.
  }
}

/*
  useOrders()  -  loads existing orders once, then keeps the list live via
  Supabase Realtime. Requires:
    1. Realtime enabled on the `orders` table (see schema.sql)
    2. An authenticated session (RLS only lets logged-in users select/update)
*/
export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    let active = true;

    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("useOrders: initial fetch failed", error);
        setOrders(data || []);
        setLoading(false);
      });

    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
          setNewOrder(payload.new);
          playBeep();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => prev.map((o) => (o.id === payload.new.id ? payload.new : o)));
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id, status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) console.error("useOrders: status update failed", error);
  }

  return {
    orders,
    loading,
    newOrder,
    clearNewOrder: () => setNewOrder(null),
    updateStatus,
  };
}
