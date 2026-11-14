// ============================================================
// NavigationPanel — Side navigation matching the PDF reference
// ============================================================

import React from 'react';
import { useApp } from '../context/contextStore';
import { DEMO_CONFIG } from '../data/demoData';

export const NavigationPanel: React.FC = () => {
  const { dispatch, getTotalRegisteredCredits, getTotalRegisteredCourses } = useApp();

  const handleNav = (screen: 'registration' | 'registeredCourses' | 'modifySlots') => {
    dispatch({ type: 'NAVIGATE', payload: screen });
  };

  return (
    <div className="nav-panel">
      {/* Left: Search */}
      <div className="nav-section nav-search">
        <div className="nav-search-row">
          <label>Search by :</label>
          <select className="nav-select">
            <option>Course Code</option>
          </select>
        </div>
        <div className="nav-search-row">
          <label>Code :</label>
          <input type="text" placeholder="Enter the Course Code" className="nav-input" />
        </div>
        <button className="btn btn-find">Find</button>
      </div>

      {/* Center: Navigation links */}
      <div className="nav-section nav-links">
        <div className="nav-link-item" onClick={() => handleNav('registration')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-link-text">Home</span>
        </div>
        <div className="nav-link-item" onClick={() => handleNav('registeredCourses')}>
          <span className="nav-icon">📋</span>
          <span className="nav-link-text">View Registered Course(s)</span>
        </div>
        <div className="nav-link-item" onClick={() => handleNav('modifySlots')}>
          <span className="nav-icon">📝</span>
          <span className="nav-link-text">Modify Slot(s)</span>
        </div>
        <div className="nav-link-item">
          <span className="nav-icon">🗑️</span>
          <span className="nav-link-text">Delete Registered Course(s)</span>
        </div>
        <div className="nav-link-item">
          <span className="nav-icon">📊</span>
          <span className="nav-link-text">Curriculum Credits View</span>
        </div>
      </div>

      {/* Right: Credits summary */}
      <div className="nav-section nav-credits">
        <table className="credits-table">
          <thead>
            <tr>
              <th></th>
              <th>Credits</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="credits-label">Maximum</td>
              <td>{DEMO_CONFIG.maxCredits}</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="credits-label">Minimum</td>
              <td>{DEMO_CONFIG.minCredits}</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="credits-label">Registered</td>
              <td>{getTotalRegisteredCredits()}</td>
              <td>{getTotalRegisteredCourses()}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-signout"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

