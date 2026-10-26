import StarPicker from "./StarPicker";   
import { useState, useEffect } from "react";

export default function EditModal({ review, onClose, onSave }) {
  const [draft, setDraft] = useState({});

  useEffect(() => {
    setDraft({
      courseTitle: review.courseTitle,
      duration: review.duration,
      note: review.note,
      score: review.score,
    });
  }, [review]);

  const set = (field) => (e) =>
    setDraft((d) => ({ ...d, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(review._id, { ...draft, score: Number(draft.score) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Review</h2>
        <form onSubmit={submit} className="modal-form">
          <label>Course Title
            <input value={draft.courseTitle || ""} onChange={set("courseTitle")} required />
          </label>
          <label>Duration
            <input value={draft.duration || ""} onChange={set("duration")} />
          </label>
          <label>Comments
            <textarea rows={4} value={draft.note || ""} onChange={set("note")} required />
          </label>
          <div className="field">
          <span className="field-label">Rating</span>
          <StarPicker
          value={draft.score}
          onChange={(n) => setDraft((d) => ({ ...d, score: n }))}
          />
</div>   
          <div className="modal-btns">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}      