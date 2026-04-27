import { Dropbox } from 'dropbox';

export const getDropboxClient = () => {
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
  const clientId = process.env.DROPBOX_CLIENT_ID;
  const clientSecret = process.env.DROPBOX_CLIENT_SECRET;
  
  // Se tiver a configuração de Refresh Token, isso cuidará da renovação automática.
  if (refreshToken && clientId && clientSecret) {
    return new Dropbox({
      clientId,
      clientSecret,
      refreshToken,
      fetch
    });
  }

  // Fallback para o token temporário (se o usuário não usar refresh token ainda)
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Você precisa configurar DROPBOX_REFRESH_TOKEN, DROPBOX_CLIENT_ID e DROPBOX_CLIENT_SECRET para a API funcionar (ou DROPBOX_ACCESS_TOKEN como fallback temporário).');
  }

  // Next.js (App Router) fetch is natively supported
  return new Dropbox({ accessToken, fetch });
};

/**
 * Busca todas as imagens de uma pasta no Dropbox e retorna os links delas
 * @param folderPath Caminho da pasta no Dropbox (vazio '' para raiz) 
 */
export async function fetchImagesFromDropbox(folderPath: string = '') {
  const dbx = getDropboxClient();

  try {
    const response = await dbx.filesListFolder({ path: folderPath });
    
    // Filtrar apenas arquivos de imagem
    const imageEntries = response.result.entries.filter(entry => 
      entry['.tag'] === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    // Como Dropbox não expõe os links diretos no listFolder, precisamos pedir 
    // um link temporário seguro para cada uma das imagens (Válido por 4 horas de uso).
    const imagesWithLinks = await Promise.all(
      imageEntries.map(async (entry) => {
        // We know it is a file because of the check above
        const fileEntry = entry as any; 
        const linkResponse = await dbx.filesGetTemporaryLink({ path: fileEntry.path_lower! });
        return {
          id: fileEntry.id || fileEntry.name,
          name: fileEntry.name,
          url: linkResponse.result.link,
        };
      })
    );

    return imagesWithLinks;
  } catch (error) {
    console.error('Erro ao comunicar com Dropbox API:', error);
    throw error;
  }
}
