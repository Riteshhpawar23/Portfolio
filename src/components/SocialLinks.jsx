import { Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from './Icons.jsx';

export default function SocialLinks({ email = true }) {
  const items = [
    ['GitHub', profile.links.github, GitHubIcon],
    ['LinkedIn', profile.links.linkedin, LinkedInIcon],
    ['LeetCode', profile.links.leetcode, LeetCodeIcon],
  ];
  return (
    <ul className="socials">
      {items.map(([name, href, Icon]) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer"><Icon size={18} /><span>{name}</span></a>
        </li>
      ))}
      {email && (
        <li><a href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" /><span>Email</span></a></li>
      )}
    </ul>
  );
}
