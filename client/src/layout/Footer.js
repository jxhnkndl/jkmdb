import React from 'react';
import { LuCopyright } from 'react-icons/lu';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import {
  BiLogoLinkedinSquare,
  BiLogoGithub,
  BiLogoGmail,
} from 'react-icons/bi';

function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="flex justify-between items-center container max-w-7xl px-4 md:px-8 py-8">
        <div className="grid-flow-col">
          <p className="mb-1">Built by J.K. Royston</p>
          <LuCopyright className="inline mr-1" /> Copyright 2023
        </div>
        <div className="grid-flow-col justify-end text-3xl md:text-5xl">
          <a
            href="https://github.com/jxhnkndl/streamo"
            rel="noreferrer"
            target="_blank"
          >
            <BiLogoGithub className="inline mr-3" />
          </a>
          <a
            href="https://www.linkedin.com/in/johnkendallroyston/"
            rel="noreferrer"
            target="_blank"
          >
            <BiLogoLinkedinSquare className="inline mr-3" />
          </a>
          <a
            href="mailto:jkroyston@gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <BiLogoGmail className="inline" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
