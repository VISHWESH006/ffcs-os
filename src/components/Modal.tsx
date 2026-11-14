// ============================================================
// Modal Component — Success, Error, Clash Warning dialogs
// ============================================================

import React from 'react';
import { useApp } from '../context/contextStore';

export const Modal: React.FC = () => {
  const { state, dispatch } = useApp();
  const { modal } = state;

  if (!modal.type) return null;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleGoToModify = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'NAVIGATE', payload: 'modifySlots' });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-heading" onClick={e => e.stopPropagation()}>
        {modal.type === 'success' && (
          <>
            <div className="modal-icon modal-icon-success">
              <svg viewBox="0 0 52 52" width="64" height="64">
                <circle cx="26" cy="26" r="25" fill="none" stroke="#4caf50" strokeWidth="2" />
                <path fill="none" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
              </svg>
            </div>
            <h3 id="modal-heading" className="modal-message">{modal.message || 'Success'}</h3>
            <button className="btn btn-primary modal-ok-btn" onClick={handleClose}>OK</button>
          </>
        )}

        {modal.type === 'error' && (
          <>
            <div className="modal-icon modal-icon-error">
              <svg viewBox="0 0 52 52" width="64" height="64">
                <circle cx="26" cy="26" r="25" fill="none" stroke="#f44336" strokeWidth="2" />
                <path fill="none" stroke="#f44336" strokeWidth="3" strokeLinecap="round" d="M18 18l16 16M34 18l-16 16" />
              </svg>
            </div>
            <h3 id="modal-heading" className="modal-title">{modal.title || 'Error'}</h3>
            <p className="modal-message">{modal.message}</p>
            <button className="btn btn-primary modal-ok-btn" onClick={handleClose}>OK</button>
          </>
        )}

        {modal.type === 'clashWarning' && (
          <>
            <div className="modal-icon modal-icon-error">
              <svg viewBox="0 0 52 52" width="64" height="64">
                <circle cx="26" cy="26" r="25" fill="none" stroke="#f44336" strokeWidth="2" />
                <path fill="none" stroke="#f44336" strokeWidth="3" strokeLinecap="round" d="M26 16v14M26 34v2" />
              </svg>
            </div>
            <h3 id="modal-heading" className="modal-title">{modal.title || 'Slot Clash'}</h3>
            <p className="modal-message">{modal.message}</p>
            {modal.clashDetails && (
              <div className="clash-details">
                {modal.clashDetails.map((clash, i) => (
                  <div key={i} className="clash-item">
                    <strong>{clash.conflictingCourseCode}</strong> — {clash.conflictingCourseTitle}
                    <br />
                    <span className="clash-slot-info">
                      Clashing slots: {clash.clashingAtomicSlots.join(', ')} (from {clash.conflictingSlot})
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleGoToModify}>Modify slot(s)</button>
              <button className="btn btn-secondary" onClick={handleClose}>Go Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

