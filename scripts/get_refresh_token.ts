import fs from 'fs';

console.log("==========================================");
console.log("= ASSISTENTE PARA OBTER O REFRESH TOKEN =");
console.log("==========================================\n");

// Substitua manualmente aqui para facilitar
const APP_KEY = process.env.DROPBOX_CLIENT_ID || '19nw8ainelh4x33';
const APP_SECRET = process.env.DROPBOX_CLIENT_SECRET || 'ycm0kmvdziqrv6r';

async function principal() {
  if (APP_KEY === 'COLE_AQUI_SUA_APP_KEY_SE_NAO_ESTIVER_NO_ENV') {
    console.log("❌ Siga as instruções no código do arquivo '/scripts/get_refresh_token.ts' para preencher seu APP_KEY e APP_SECRET.");
    return;
  }

  // PASSO 1
  const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${APP_KEY}&token_access_type=offline&response_type=code`;
  console.log("📍 Passo 1: Abra o seguinte link no seu navegador:");
  console.log("\n   " + authUrl + "\n");
  console.log("Clique em Permitir (Allow) se solicitado e depois copie o código de acesso mostrado na tela.\n");

  console.log('📍 Após obter o código substitua a variável "CODIGO_GERADO_NO_SITE" no arquivo e rode o script novamente.\n');
  
  // Substitua a string abaixo com o código que apareceu no site.
  // Quando preencher, execute este script com: npx tsx scripts/get_refresh_token.ts
  const CODIGO_GERADO_NO_SITE = '';

  if (!CODIGO_GERADO_NO_SITE) {
    return;
  }

  console.log("🔄 Passo 2: Obtendo Refresh Token a partir do código...\n");
  
  try {
    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code: CODIGO_GERADO_NO_SITE,
        grant_type: 'authorization_code',
        client_id: APP_KEY,
        client_secret: APP_SECRET,
      }).toString()
    });

    const data = await response.json();
    if (data.refresh_token) {
       console.log("✅ SUCESSO! Aqui está seu Refresh Token (Adicione isto em DROPBOX_REFRESH_TOKEN):");
       console.log("\n   " + data.refresh_token + "\n");
       console.log("⚠️ ATENÇÃO: Adicione essas variáveis na tela de configurações/secrets do projeto:");
       console.log(`\n   DROPBOX_CLIENT_ID=${APP_KEY}\n   DROPBOX_CLIENT_SECRET=${APP_SECRET}\n   DROPBOX_REFRESH_TOKEN=${data.refresh_token}\n\nO site já está programado para utilizar automaticamente essas chaves e se renovar.`);
    } else {
       console.log("❌ Falha. Resposta da API:", data);
       console.log("Isto geralmente acontece se o código expirou ou já foi usado uma vez.");
    }
  } catch (err) {
    console.error("❌ Erro de conexão:", err);
  }
}
principal();
