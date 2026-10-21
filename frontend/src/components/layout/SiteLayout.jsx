import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout({ footer = 'compact' }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <SiteHeader />
      <div className="pt-20 flex flex-col flex-1">
        <Outlet />
      </div>
      <SiteFooter variant={footer} />
    </div>
  );
}
