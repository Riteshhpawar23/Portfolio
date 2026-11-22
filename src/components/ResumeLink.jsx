import { profile } from '../data/profile.js';

export default function ResumeLink({ children, ...rest }) {
  const { href, download } = profile.resume;
  const target = download ? { download } : { target: '_blank', rel: 'noopener noreferrer' };
  return <a href={href} {...target} {...rest}>{children}</a>;
}
