import React, { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';

import { LandingPage } from '../../common/sentry';
import { SegmentEvent } from '../analytics';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    window.main.landingPageRendered(LandingPage.Login);
  }, []);

  const logoutMessage = window.localStorage.getItem('logoutMessage');
  useEffect(() => {
    if (logoutMessage) {
      window.localStorage.removeItem('logoutMessage');
      setMessage(logoutMessage);
    }
  }, [logoutMessage]);

  return (
    <div className="flex flex-col gap-[--padding-lg]">
      <div className="flex flex-col gap-[--padding-md]">
        <div className="text-sm font-extrabold [text-wrap:balance]">
          <span className="inline-flex h-[calc(theme(fontSize.sm)*theme(lineHeight.tight))] flex-col overflow-hidden text-indigo-300">
            <ul className="animate-text-slide-4 block text-right leading-tight [&_li]:block">
              <li>Debug</li>
              <li>Design</li>
              <li>Test</li>
              <li>Mock</li>
              <li aria-hidden="true">Debug</li>
            </ul>
          </span>
          <span className="ml-1 text-[--color-font]">APIs locally, on Git or in the Cloud.</span>
        </div>
        {message && <div className="text-sm font-bold text-red-300">{message}</div>}

        <Button
          aria-label="Use the local Scratch Pad"
          onPress={() => {
            window.main.trackSegmentEvent({
              event: SegmentEvent.selectScratchpad,
            });
            navigate('/organization/org_scratchpad/project/proj_scratchpad/workspace/wrk_scratchpad/debug');
          }}
          className="flex w-full items-center justify-center gap-[--padding-md] rounded-md border border-solid border-[--hl-md] text-base text-[--color-font] ring-1 ring-transparent transition-all hover:bg-[--hl-xs] focus:ring-inset focus:ring-[--hl-md] aria-pressed:bg-[--hl-sm]"
        >
          <div className="flex h-[35px] w-[40px] items-center justify-center border-r border-solid border-[--hl-sm] bg-[--hl-xs]">
            <i className="fa fa-edit" />
          </div>
          <span className="items flex-1">Use the local Scratch Pad</span>
        </Button>

        <p className="text-center text-xs text-[rgba(var(--color-font-rgb),0.8)]">
          By using Insomnia, you agree to the{' '}
          <a
            className="font-bold outline-none transition-colors hover:text-[--color-font] focus:text-[--color-font]"
            href="https://insomnia.rest/terms"
            rel="noreferrer"
          >
            terms of service
          </a>{' '}
          and{' '}
          <a
            className="font-bold outline-none transition-colors hover:text-[--color-font] focus:text-[--color-font]"
            href="https://insomnia.rest/privacy"
            rel="noreferrer"
          >
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
