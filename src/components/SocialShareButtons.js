"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";

export function SocialShareButtons({ guide }) {
  return (
    <div className="flex gap-x-6">
      <FacebookShareButton
        url={`https://swisscvbuilder.ch/guides/${guide.slug}`}
        title={guide.title}
        className="transition ease-in-out delay-100 hover:scale-110 duration-50"
      >
        <FacebookIcon size={34} round />
      </FacebookShareButton>
      <LinkedinShareButton
        url={`https://swisscvbuilder.ch/guides/${guide.slug}`}
        title={guide.title}
        className="transition ease-in-out delay-100 hover:scale-110 duration-50"
      >
        <LinkedinIcon size={34} round />
      </LinkedinShareButton>
      <TwitterShareButton
        url={`https://swisscvbuilder.ch/guides/${guide.slug}`}
        title={guide.title}
        className="transition ease-in-out delay-100 hover:scale-110 duration-50"
      >
        <XIcon size={34} round />
      </TwitterShareButton>
      <EmailShareButton
        url={`https://swisscvbuilder.ch/guides/${guide.slug}`}
        title={guide.title}
        subject={guide.title}
        className="transition ease-in-out delay-100 hover:scale-110 duration-50"
      >
        <EmailIcon size={34} round />
      </EmailShareButton>
    </div>
  );
}
