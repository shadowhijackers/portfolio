import React, { useState } from 'react';

function SkillIcon({ name, icon }) {
  const [broken, setBroken] = useState(false);

  if (!icon || broken) {
    return (
      <span className="skill-icon skill-icon-fallback" aria-hidden="true">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={icon}
      alt=""
      className="skill-icon"
      width={22}
      height={22}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

export function SkillsBlock({ title, skills, animIndex, variant = 'default', ariaLabel }) {
  return (
    <div
      className={`skills-block skills-block--${variant} anim-item`}
      style={{ '--i': animIndex }}
    >
      <h2 className="skills-title">{title}</h2>
      <ul className="skills" aria-label={ariaLabel ?? title}>
        {skills.map((skill, i) => (
          <li key={skill.name} style={{ '--skill-i': i }}>
            <span className="skill-name">{skill.name}</span>
            <SkillIcon name={skill.name} icon={skill.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}
