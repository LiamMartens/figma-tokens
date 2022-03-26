import { useDispatch } from 'react-redux';
import { Dispatch } from '@/app/store';
import { ContextObject, StorageProviderType } from '@/types/api';
import { MessageToPluginTypes } from '@/types/messages';
import { notifyToUI, postToFigma } from '../../../plugin/notifiers';
import { SetTokenDataPayload } from '@/types/payloads';

// @TODO fix typings

async function readTokensFromURL({ secret, id }: ContextObject): Promise<SetTokenDataPayload['values'] | null> {
  let customHeaders: Record<string, string> = {};
  const defaultHeaders = {
    Accept: 'application/json',
  };
  try {
    customHeaders = JSON.parse(secret) as typeof customHeaders;
  } catch (err) {
    // @RAEDME ignore error
  }

  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  };
  const response = await fetch(id, {
    method: 'GET',
    headers,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  notifyToUI('There was an error connecting, check your sync settings');
  return null;
}

export default function useURL() {
  const dispatch = useDispatch<Dispatch>();

  // Read tokens from URL
  async function pullTokensFromURL(context: ContextObject): Promise<SetTokenDataPayload | null> {
    const { id, secret, name } = context;

    if (!id && !secret) return null;

    try {
      const data = await readTokensFromURL(context);
      dispatch.uiState.setProjectURL(id);

      if (data) {
        postToFigma({
          type: MessageToPluginTypes.CREDENTIALS,
          id,
          name,
          secret,
          provider: StorageProviderType.URL,
        });
        if (data) {
          const tokenObj = {
            values: data,
          };
          dispatch.tokenState.setTokenData(tokenObj);
          dispatch.tokenState.setEditProhibited(true);
          return tokenObj;
        }

        notifyToUI('No tokens stored on remote');
      }
    } catch (e) {
      notifyToUI('Error fetching from URL, check console (F12)');
      console.log('Error:', e);
    }

    return null;
  }

  return {
    pullTokensFromURL,
  };
}
