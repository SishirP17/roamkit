import { createContext, useContext, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import ExternalLinkModal from '../components/ExternalLinkModal';

// A single app-wide "leaving the app" confirmation. Any screen can call
// useExternalLink().confirmOpen(url, { title, message }) to show a smooth sheet
// before the browser opens, instead of jumping straight out of the app.

const ExternalLinkContext = createContext({ confirmOpen: () => {} });

const EMPTY = { visible: false, url: null, title: null, message: null };

export function ExternalLinkProvider({ children }) {
  const [state, setState] = useState(EMPTY);

  const cancel = () => setState((s) => ({ ...s, visible: false }));

  const proceed = async () => {
    const { url } = state;
    setState((s) => ({ ...s, visible: false }));
    if (url) {
      try {
        await Linking.openURL(url);
      } catch (e) {}
    }
  };

  const value = useMemo(
    () => ({
      confirmOpen: (url, opts = {}) =>
        setState({
          visible: true,
          url,
          title: opts.title || null,
          message: opts.message || null,
        }),
    }),
    []
  );

  return (
    <ExternalLinkContext.Provider value={value}>
      {children}
      <ExternalLinkModal
        visible={state.visible}
        url={state.url}
        title={state.title}
        message={state.message}
        onCancel={cancel}
        onProceed={proceed}
      />
    </ExternalLinkContext.Provider>
  );
}

export function useExternalLink() {
  return useContext(ExternalLinkContext);
}
