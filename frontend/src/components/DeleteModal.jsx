export default function DeleteModal({ review, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Review</h2>
        <p className="delete-msg">
          Are you sure you want to delete feedback for{" "}
          <strong>{review.courseTitle}</strong>?
        </p>
        <div className="modal-btns">
          <button className="btn-danger" onClick={() => onConfirm(review._id)}>
            Delete
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}   