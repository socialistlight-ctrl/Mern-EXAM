import { useState } from "react";
import useReviews from "../hooks/useReviews";
import ReviewCard from "../components/ReviewCard";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";   

export default function Home() {
  const { items, busy, msg, remove, patch } = useReviews();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);   
  if (busy) return <p className="placeholder">Loading…</p>;

  const avg = items.length
    ? (items.reduce((s, r) => s + r.score, 0) / items.length).toFixed(1)
    : "—";

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="kpi-row">
        <div className="kpi"><strong>{items.length}</strong><span>Total</span></div>
        <div className="kpi"><strong>{avg}</strong><span>Avg Score</span></div>
        <div className="kpi"><strong>{new Set(items.map((r) => r.courseTitle)).size}</strong><span>Courses</span></div>
      </div>

      {msg && <p className="err">{msg}</p>}

      {items.length === 0 ? (
        <p className="placeholder">No reviews yet — head to "Add Feedback".</p>
      ) : (
        <div className="card-grid">
          {items.map((r, i) => (
            <ReviewCard
              key={r._id}
              review={r}
              index={i}
              onEdit={setEditing}
              onDelete={(id) => setDeleting(items.find((r) => r._id === id))}   
            />
          ))}
        </div>
      )}

      {editing && (
        <EditModal
          review={editing}
          onClose={() => setEditing(null)}
          onSave={async (id, payload) => {
            await patch(id, payload);
            setEditing(null);
          }}
        />
      )}
      {deleting && (
  <DeleteModal
    review={deleting}
    onCancel={() => setDeleting(null)}
    onConfirm={async (id) => {
      await remove(id);
      setDeleting(null);
    }}
  />
)}   
    </section>
  );
}   