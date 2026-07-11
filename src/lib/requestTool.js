import { Alert, Linking, Platform } from 'react-native';
import { ADMIN_EMAIL, APP_NAME, APP_VERSION } from '../config';

// Opens the user's email client with a prefilled "request a tool" message.
// This is the lightweight v1 of the future request → admin-approval system.
export async function requestTool() {
  const subject = `${APP_NAME}: Tool request`;
  const body =
    `Hi! I'd love a tool that does:\n\n` +
    `(describe it here)\n\n` +
    `---\n${APP_NAME} v${APP_VERSION} · ${Platform.OS}`;
  const url = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  try {
    await Linking.openURL(url);
    return true;
  } catch (e) {
    // No email app (common on tablets/fresh devices) — don't fail silently.
    Alert.alert('No email app found', `Send your idea to ${ADMIN_EMAIL} instead.`);
    return false;
  }
}
