export default function ReviewCard({ review, index, onEdit, onDelete }) {
  return (
    <article className="rcard">
      <div className="rcard-top">
        <span className="rcard-id">CRS-{String(index + 1).padStart(3, "0")}</span>
        <span className="rcard-score">{"★".repeat(review.score)}{"☆".repeat(5 - review.score)}</span>
      </div>
      <h3 className="rcard-title">{review.courseTitle}</h3>
      <p className="rcard-meta">Duration: {review.duration}</p>
      <p className="rcard-note">{review.note}</p>
      <div className="rcard-actions">
        <button className="btn-edit" onClick={() => onEdit(review)}>Update</button>
        <button className="btn-del" onClick={() => onDelete(review._id)}>Delete</button>
      </div>
    </article>
  );
}   