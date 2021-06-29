
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery, useMutation, gql } from '@apollo/client';

import styled from '@emotion/styled';
import { useMediaQuery, AppBar, Tabs, Divider } from '@material-ui/core';
import {
  Settings as SettingsIcon,
  Brightness7 as LightIcon,
  Brightness4 as DarkIcon,
} from '@material-ui/icons';

import LabelTab from './LabelTab';
import IconTab from './IconTab';


const GET_THEME = gql `
  query GetTheme {
    theme
  }
`;

const SET_THEME = gql `
  mutation SetTheme($theme: Theme) {
    setTheme(theme: $theme) {
      theme
    }
  }
`;


export function NavTab({ value, ...props }) {
  return <LabelTab component={Link}
    color="inherit"
    value={value}
    to={value}
    { ...props } />;
}
NavTab.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export function IconNavTab({ value, ...props }) {
  return <IconTab component={Link}
    color="inherit"
    value={value}
    to={value}
    { ...props } />;
}
IconNavTab.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export const TabSpacer = styled.div `
  flex-grow: 1;
  flex-shrink: 1;
`;
export const TabDivider = styled(() =>
  <Divider flexItem orientation="vertical" />
) `
  margin-top: 12px;
  margin-bottom: 12px;
`;

export default function Navigation() {
  const { t } = useTranslation('ui');
  const { pathname } = useLocation();

  const position =
    useMediaQuery((t) => t.breakpoints.up('sm'))
      ? 'sticky'
      : 'static';

  const { data } = useQuery(GET_THEME);
  const [ setTheme ] = useMutation(SET_THEME, {
    refetchQueries: [{ query: GET_THEME }],
  });

  const theme = data?.theme;
  const otherTheme = (theme === 'DARK') ? 'LIGHT' : 'DARK';
  const onChangeTheme = () => setTheme({
    variables: { theme: otherTheme },
    optimisticResponse: { __typename: 'Query', theme: otherTheme },
  });

  return (
    <AppBar component="nav" position={position} color="inherit">
      <Tabs value={pathname} textColor="primary" indicatorColor="primary">
        <NavTab value="/">Home</NavTab>

        <TabDivider />
        <NavTab value="/depot">{ t('navigation.depot') }</NavTab>
        <NavTab value="/roster">{ t('navigation.roster') }</NavTab>
        <NavTab value="/plans">{ t('navigation.plans') }</NavTab>

        <TabDivider />
        <NavTab value="/items">{ t('navigation.items') }</NavTab>
        <NavTab value="/operators">{ t('navigation.operators') }</NavTab>

        <TabSpacer />
        <IconNavTab
          value={`?settings[theme]=${otherTheme}`}
          onClick={onChangeTheme}
        >
          { (theme === 'DARK')
            ? <DarkIcon />
            : <LightIcon /> }
        </IconNavTab>

        <TabDivider />
        <IconNavTab value="/settings"><SettingsIcon /></IconNavTab>
      </Tabs>
    </AppBar>
  );
}
