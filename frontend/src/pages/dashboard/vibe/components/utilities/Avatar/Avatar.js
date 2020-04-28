import React from 'react';

export default function Avatar({ size, color, className, initials, image }) {
  return (
    <div>
      {image && <img src={image} className="avatar-image header_avatar" alt="" />}
      {initials && !image && <div className={`avatar avatar-${size} bg-${color} ${className}`}>
        <div className="user-initials">{initials}</div>
      </div>}
    </div>

  );
}
