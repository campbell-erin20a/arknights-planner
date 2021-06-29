
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useSSR } from 'react-i18next';

import App from '@shared/App';


export default function Root({ i18nState }) {
  useSSR(i18nState.store, i18nState.language);

  useEffect(() => {
    const jss = document.getElementById('mui-jss');
    if( jss ) {
      jss.parentElement.removeChild(jss);
    }
  }, []);

  return <App/>;
}
Root.propTypes = {
  i18nState: PropTypes.shape({
    language: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  }).isRequired,
}
