/* Use this file an the others in the template
directory for a reference on what the other 
components should look like. */
import style from "./modal.module.css";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.base} onClick={(e) => e.stopPropagation()}>
        <button className={style.close} onClick={onClose}>
          +
        </button>
        {children}
      </div>
    </div>
  );
}
