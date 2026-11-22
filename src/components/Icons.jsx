import { siGithub, siLeetcode } from 'simple-icons';

export function Brand({ icon, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

export const GitHubIcon = (props) => <Brand icon={siGithub} {...props} />;
export const LeetCodeIcon = (props) => <Brand icon={siLeetcode} {...props} />;

// Neither icon package ships a LinkedIn mark
export function LinkedInIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="2" y="9" width="4.2" height="12" />
      <circle cx="4.1" cy="4.2" r="2.2" />
      <path d="M9.3 9h4v1.7a4.6 4.6 0 0 1 3.9-2c4 0 4.8 2.6 4.8 6V21h-4.2v-5.5c0-1.4 0-3.1-2-3.1s-2.3 1.5-2.3 3V21H9.3z" />
    </svg>
  );
}
