import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/ui/footer';

export default function SobreAColecao() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <header className="p-6 border-b border-zinc-300/50 bg-zinc-100/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-zinc-900">A Coleção</h1>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-800 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex-grow">
        <div className="space-y-8 text-lg text-zinc-800 leading-relaxed font-sans">
          <p>
            Manuel Eduardo Pierre Solon começou sua coleção de fotogramas ainda criança, conseguidos no cine são João, em Sobral. Seus álbuns foram aumentando em sua passagem pelo Crato. Já em Fortaleza chegou ao auge quando frequentava as seções dos cines Rex e Diogo.
          </p>

          <p>
            A coleção é resultado de um hobby quase obsessivo que começou em 1936. O primeiro fotograma da coleção, Eduardo Solon nunca esquece: “Eu tinha 11 anos e foi Tarzan, o filho da Selva”. Naquela época assistia a todos os filmes, ocorre que para torna-se um colecionador de fotogramas não basta apenas gostar de cinema. Outros pré-requisitos: uma boa dose de paciência e uma outra de abnegação. Eduardo Solon que era um desses, só ia pro cinema na companhia de um caderno de notas, ele primeiro rabiscava hora, minuto e segundo do plano que mais lhe interessava na tela. “Sempre aquele em que os protagonistas ou alguns coadjuvantes estivessem em close”, pontua. Findo o filme, começava a segunda batalha: convencer o projecionista a cortar o pedaço da fita equivalente as suas anotações. Mesmo gozando da amizade do responsável pela tarefa, tinha de pagar por isso, o que o obrigava a juntar todo o dinheiro da merenda para trocá-lo por fotograma durante as sessões Colosso que passavam aos sábados no cine São João, com os dois filmes da semana. Noutra investida foi até Recife à cata de Charles Chaplin em O Grande Ditador, chegou atrasado e a coleção fica devendo essa: não tem um fotograma de Carlitos. Mas cobre três fases do cinema – o mudo, o movietone e o falado - com competência. Com direito a dois fotogramas da cena do primeiro beijo Da história do cinema, trocado por Mary Irvin e John C.Rice, um filmezinho de um minuto, uma sensação atribuída á empresa Kunh, em 1895 e Al Jolson em O Cantor de Jazz, primeiro filme sonoro de Hollywood.
          </p>

          <p>
            Fazem parte da coleção, clássicos do cinema como: Judy Garland em O Mágico de Oz,Humphrey Bogart e Ingrid Bergman em Casablanca, Marlon Brando em O Selvagem, Brigite Bardot em Brotinho de Outro Mundo, Grace Kelly e James Stewart em janela Indiscreta, Orson Welles em O amanhã é eterno, Rodolfo Valentino em O Filho do Sheik e quase mil fotogramas do cinema nacional: vários fotogramas do clássico O cangaceiro de Lima Barreto; Carmen Miranda em Uma noite no Rio; Oscarito em Matar ou Correr; Zé Trindade, Nelson Gonçalves, Emilinha Borba, John Herbert em O Feijão é nosso, e muitos outro como Grande Otelo, Ângela Maria e Tônia Carneiro.
          </p>

          <p>
            O acervo conta mais de trinta mil fotogramas de cinema (décadas de 20 a 60) é constituído de 6.000(seis mil) fotogramas catalogados e 25.000 (vinte e cinco mil) que ainda não foram catalogados, esses fotogramas, foram cuidadosamente guardados em álbuns feitos para esse fim e em geral mostram os atores principais dos filmes, contento o nome e o ano da produção.
          </p>

          <p>
            Eduardo Solon Bioquímico, farmacêutico e professor aposentado da faculdade de Direito, formado ainda em Administração de Empresas, tece um ou outro comentário com curiosidade sobre as produções que ele acompanhou de longe.” Para mim, quando morre um ator é como se eu tivesse morrido junto e quando vejo um envelhecer, é o mesmo que observar meu envelhecimento, desabafa. “ É que eu vivi a vida deles.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
