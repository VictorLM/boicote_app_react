import React from 'react';
import { Popover, Overlay } from 'react-bootstrap';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
  // ICONS
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

// SETANDO transition={false} NO MODAL PORQUE COM ANIMAÇÃO ESTÁ LEVANTANDO UM ERRO DO REACT

const CompartilharBtnsPopover = ({ show, target, url }) => (

  <Overlay
    show={show}
    target={target}
    placement="top"
    transition={false}
  >
    <Popover className="text-center" id="popover-compartilhar-btns">
      <Popover.Content>

        <TwitterShareButton className="btn pr-1" url={url}>
          <TwitterIcon round size={36} />
        </TwitterShareButton>
        <FacebookShareButton className="btn pr-1" url={url}>
          <FacebookIcon round size={36} />
        </FacebookShareButton>
        <WhatsappShareButton className="btn pr-1" url={url}>
          <WhatsappIcon round size={36} />
        </WhatsappShareButton>
        <TelegramShareButton className="btn pr-1" url={url}>
          <TelegramIcon round size={36} />
        </TelegramShareButton>
        <RedditShareButton className="btn pr-1" url={url}>
          <RedditIcon round size={36} />
        </RedditShareButton>
        <EmailShareButton className="btn pr-1" url={url}>
          <EmailIcon round size={36} />
        </EmailShareButton>

      </Popover.Content>
    </Popover>
  </Overlay>
);

export default CompartilharBtnsPopover;
