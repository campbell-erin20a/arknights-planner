
import PropTypes from 'prop-types';
import { Types } from '@@/utils/operator';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';


const Icon = styled.div `
  width: ${({ theme: t }) => t.spacing(9)}px;
  height: 100%;
  flex-shrink: 0;
  background: no-repeat center/cover url("/images/operators/${({ id }) => id}.webp");
`;
Icon.propTypes = {
  id: PropTypes.string.isRequired,
};

const HeaderRow = styled.div `
  display: flex;
  justify-content: space-between;
  padding-right: ${({ theme: t }) => t.spacing(1)}px;
  margin: ${({ theme: t }) => t.spacing(-0.5)};

  &:first-of-type {
    padding-top: ${({ theme: t }) => t.spacing(2)}px;
  }
  &:last-of-type {
    padding-bottom: ${({ theme: t }) => t.spacing(2)}px;
  }
`;
const HeaderRowText = styled.div `
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Header({
  id, name, elite, level, skills, potential, trust,
  isOwned, toggleOwned, isOpen, toggleOpen,
}) {
  return (
    <div css={(t) => css `display: flex; height: ${t.spacing(14)}px;`}>
      <Icon id={id} />
      <div css={(t) => css `
        padding-left: ${t.spacing(2)}px;;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}>
        <HeaderRow>
          <HeaderRowText>
            <Typography variant="h5">{name}</Typography>
          </HeaderRowText>
          <IconButton
            color={isOwned ? 'primary' : 'default'}
            onClick={toggleOwned}
          ><FavoriteIcon/></IconButton>
        </HeaderRow>
        <HeaderRow>
          <HeaderRowText>
            { isOwned &&
              <Typography variant="body2" color="textSecondary">
                { `E${elite}-${level} - P${potential} - T${trust}` }
              </Typography> }
            { isOwned &&
              <Typography variant="body2" color="textSecondary">
                { ((skills[1]?.level + skills[2]?.level + skills[3]?.level) > 0)
                  ? skills.map((l, i) => (l?.level > 0) && `S${i}M${l?.level}`)
                      .slice(1).filter(Boolean).join(' - ')
                  : (skills[0] != null)
                    ? `S${skills[0]?.level}`
                    : '\u200B' }
              </Typography> }
          </HeaderRowText>
          <IconButton
            className={isOpen ? 'open' : null}
            css={(t) => css `
              transform: rotate(0deg);
              transition: ${
                t.transitions.create('transform', {
                  duration: t.transitions.duration.shortest,
                })};

              &.open {
                transform: rotate(180deg);
              }
            `}
            onClick={toggleOpen}
          ><ExpandMoreIcon/></IconButton>
        </HeaderRow>
      </div>
    </div>
  );
}
Header.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  elite: Types.elite.isRequired,
  level: PropTypes.number.isRequired,
  skills: Types.skills.shapes.isRequired,
  potential: Types.potential.isRequired,
  trust: Types.trust.isRequired,

  isOwned: PropTypes.bool,
  toggleOwned: PropTypes.func.isRequired,

  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
};
