import { Dropbox } from 'dropbox';

async function run() {
  console.log("clientId:", process.env.DROPBOX_CLIENT_ID ? 'set' : 'not set');
  console.log("clientSecret:", process.env.DROPBOX_CLIENT_SECRET ? 'set' : 'not set');
  console.log("refreshToken:", process.env.DROPBOX_REFRESH_TOKEN ? 'set' : 'not set');
  console.log("accessToken:", process.env.DROPBOX_ACCESS_TOKEN ? 'set' : 'not set');
}
run();
