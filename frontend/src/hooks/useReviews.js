import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE = `${process.env.REACT_APP_API}/reviews`;

export default function useReviews() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(BASE);
      setItems(data);
    } catch {
      setMsg("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await axios.delete(`${BASE}/${id}`);
    setItems((prev) => prev.filter((r) => r._id !== id));
  };

  const patch = async (id, payload) => {
    await axios.put(`${BASE}/${id}`, payload);
    setItems((prev) => prev.map((r) => (r._id === id ? { ...r, ...payload } : r)));
  };

  return { items, busy, msg, reload: load, remove, patch };
}   