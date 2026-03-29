'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Must match basePath in next.config.ts when deployed to GitHub Pages.
const BASE_PATH = '/fitness-app';

/**
 * Handles the GitHub Pages SPA routing trick.
 *
 * When a user navigates directly to a deep URL (e.g. /fitness-app/dashboard/),
 * GitHub Pages serves the 404.html which redirects to /?p=<encoded-path>.
 * This component reads that `?p=` query param on mount, calls
 * history.replaceState to restore the real URL, then uses Next.js router to
 * navigate to the correct route so the app renders the right page.
 */
export function GithubPagesRedirect() {
  const router = useRouter();

  useEffect(() => {
    const search = window.location.search;
    if (!search) return;

    const params = new URLSearchParams(search);
    const redirectPath = params.get('p');
    if (!redirectPath) return;

    const hash = params.get('h') ?? '';

    // Build the restored path (relative to basePath) and the full browser URL.
    const routerPath = decodeURIComponent(redirectPath) + decodeURIComponent(hash);
    if (!routerPath) return;

    // Replace the ?p= URL in the browser history with the real path
    // so the back button and address bar show the correct URL.
    window.history.replaceState(null, '', BASE_PATH + routerPath);

    // Let Next.js router take over and render the correct page.
    // router.replace paths are relative to basePath, so no prefix needed.
    router.replace(routerPath);
  }, [router]);

  return null;
}
