import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

let ResultModal = forwardRef(function ResultModal(
  { timeRemaining, targetTime, onReset },
  ref
) {
  let dialog = useRef();

  let score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => ({
    open: () => {
      try {
        dialog.current.showModal();
      } catch (error) {
        console.log("Couldn't open modal or modal is already open.");
      }
    },
  }));
  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {timeRemaining <= 0 ? <h2>You Lost</h2> : <h2>score: {score} / 100</h2>}

      <p>
        The target time was <strong>{targetTime}</strong>
      </p>
      <p>
        You stopped the timer at
        <strong> {(timeRemaining / 1000).toFixed(2)} seconds left </strong>
      </p>
      <form method='dialog' onSubmit={onReset}>
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
