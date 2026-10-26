import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarPicker from "../components/StarPicker";

const BASE = `${process.env.REACT_APP_API}/reviews`;

export default function NewReview() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    courseTitle: "",
    duration: "",
    note: "",
    score: 3,
  });
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(BASE, form);
      nav("/");
    } catch {
      alert("Submission failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h1>Add Feedback</h1>
      <form className="nform" onSubmit={submit}>
        <label>Course Name
          <input value={form.courseTitle} onChange={set("courseTitle")} placeholder="e.g. Data Structures in C" required />
        </label>
        <label>Duration
          <input value={form.duration} onChange={set("duration")} placeholder="e.g. 10 weeks" />
        </label>
        <label>Feedback Comments
          <textarea rows={5} value={form.note} onChange={set("note")} placeholder="Write your thoughts…" required />
        </label>
        <div className="field">
          <span className="field-label">Rating</span>
          <StarPicker value={form.score} onChange={(n) => setForm((f) => ({ ...f, score: n }))} />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Sending…" : "Submit"}
        </button>
      </form>
    </section>
  );
}   