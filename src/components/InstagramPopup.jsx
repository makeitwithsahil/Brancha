import React, { useEffect, useState } from 'react';

const InstagramPopup = () => {
  const [isInstagram, setIsInstagram] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (ua.includes("Instagram")) {
      setIsInstagram(true);
    }
  }, []);

  if (!isInstagram || dismissed) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Having Trouble?</h2>
        <p style={styles.text}>
          Instagram’s browser may block parts of this site.  
          Tap the 3-dot menu and choose <b>“Open in Chrome”</b> for the best experience.
        </p>
        <button style={styles.button} onClick={() => setDismissed(true)}>Got it</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  heading: {
    marginBottom: '12px',
    fontSize: '1.5rem',
    color: '#333',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default InstagramPopup;
