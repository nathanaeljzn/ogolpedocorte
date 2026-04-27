/* eslint-disable react/no-unescaped-entities */
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import Image from 'next/image';

export default function SolonRibeiroPage() {
  return (
    <main className="min-h-screen bg-[#F4F9F6] text-[#0E472D] selection:bg-[#0E472D] selection:text-[#F4F9F6]">
      <Navbar />
      
      <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 text-[#0E472D]">Solon Ribeiro</h1>
          <p className="text-xl text-[#2B734D] font-medium uppercase tracking-widest">O Artista / The Artist</p>
        </header>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#E3F0E9] mb-16 shadow-xl shadow-[#0E472D]/10">
          <Image
            src="https://picsum.photos/seed/solon-full/1200/600?grayscale"
            alt="Solon Ribeiro"
            fill
            className="object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[#0E472D]/10 rounded-2xl" />
        </div>

        <div className="prose prose-lg prose-zinc max-w-none text-[#2B734D] prose-headings:text-[#0E472D] prose-headings:font-display prose-a:text-[#0E472D] hover:prose-a:text-[#B71C1C] prose-strong:text-[#0E472D]">
          
          <section className="mb-16">
            <p>
              Nos anos de 1990, o artista Solon Ribeiro herdou de seu pai uma imensa coleção de mais de trinta mil fotogramas retirados de filmes. A coleção foi iniciada nos anos 50 por seu avô, Ubaldo Uberaba Solon, dono de uma sala de cinema no Crato (na região do Cariri, sul do Ceará). Os fotogramas, em geral mostrando protagonistas de filmes clássicos de Hollywood, eram cuidadosamente guardados em álbuns feitos especialmente para este fim, contendo o nome e o ano de cada filme, bem como uma legenda com os nomes dos atores. Uma parte da coleção se encontra fora dos álbuns, tendo sido guardada de forma imprecisa, complicando a catalogação por ser difícil saber exatamente de que filme cada imagem teria sido extraída.
            </p>
            <p>
              Solon Ribeiro trabalha com fotografia desde os anos 70. Como muitos artistas contemporâneos, seu trabalho se volta para a problematização das imagens clichês, tendo em vista o fenômeno contemporâneo (já ecológico) da saturação de imagens. Com a herança dos fotogramas, dá-se uma espécie de reencontro no caminho traçado por Solon: encontro entre o percurso questionador do artista e suas primeiras experiências em salas de cinema. Com a volta de fantasmas hollywoodianos, seu trabalho sofre uma metamorfose. Solon e as imagens de Hollywood se fundirão num ato violento e revelador.
            </p>
          </section>

          <hr className="border-[#B1D8C4]/50 my-16" />

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Solon Ribeiro ou a violentação das imagens clichês</h2>
            <p className="text-sm uppercase tracking-widest mb-8 text-[#B71C1C]">Texto: André Parente / Lucas Parente</p>
            
            <p>
              O Golpe do Corte é o termo utilizado por Solon para tratar da série de vídeos e instalações feitos com a coleção de fotogramas. Em um dos trabalhos, Solon utiliza fotogramas com legendas e cria um diálogo imaginário entre as personagens. Em outro, ele projeta os fotogramas de cima, enquanto maneja uns almofadões sobre os quais se deita, de forma que possam refletir melhor as imagens dos fotogramas. Assim, Solon ultrapassa o sentido da apropriação por meio da parada na imagem para se tornar uma espécie de arquivo vivo com uma dimensão performática. Curiosamente o artista parece um ator do cinema expressionista, um tanto incomodado pelas imagens que sobre ele são projetadas, como os clichês porventura pudessem roubar-lhe a alma. E veremos como, pouco a pouco, os clichês parecem de fato ganhar cada vez mais vida no trabalho de Solon até se tornarem verdadeiros duplos do artista. É até mesmo possível classificar diversos tipos de duplos que encarnam as imagens clichês na obra de Solon: doppelgängers (duplo fantasmático que surge como um augúrio de uma morte vindoura), incubos e sucumbis (demônios sexuais, masculinos ou femininos, que invadem nosso quarto quando sofremos de paralisia do sono), fiends (demônios sobrenaturais associados à possessão), todos estão presentes.
            </p>
            <p>
              Este aspecto de estranhamento com a imagem vai se radicalizar no momento que que Solon começa a projetar os fotogramas em toda parte. O projetor se move, o que faz com que as imagens fotogramáticas planem pelos espaços como fantasmas buscando um corpo. Solon filma as projeções que faz em espaços paralelos: um teatro (o Teatro José de Alencar), um jardim de uma casa antiga, um abatedouro, uma festa em um cinema pornô (Cine Betão). Os espaços ecoam uns nos outros produzindo uma ressonância que se dá frenéticamente pelo atravessamento da imagem. As imagens dos fotogramas, cheias de glamour, são completamente violentadas por meio de gestos do artista que interage com a carne, com o sangue, com as tripas e com as imagens, quando Solon aparece no matadouro, em meio a restos de bois mortos.
            </p>
            <p>
              Esta violentação das imagens clichês remete à das Cosmococas ou Quase-Cinema de Hélio Oiticica e Neville d’Almeida. Ambos os trabalhos devem muito à prática do Cinema Marginal de ressignificar os clichês da cultura pop norte-americana, numa lógica que visa “devolver o olhar” do colonizado ao colonizador. Se o olhar do colonizador transforma tudo e todos em objeto de consumo (principalmente através da colonização do imaginário)¹, “devolver o olhar” (como um escravo suicida que deixa de olhar para o chão e passa a olhar na cara do senhor) seria a principal forma de reverter essa relação de poder. Os desenhos de cocaína nas capas de revista e nos LPs americanos, as projeções de filmes clássicos sobre carnes de abatedouro, a troca de tiros entre um macaco e um cego em Bang Bang, trata-se sempre de uma estética que destripa e disseca as imagens clichês, imagens estas que parecem passar por verdadeiro um suplício (ou sacrifício). É neste sentido que Solon aparece com uma máscara de bandido manchada de sangue no abatedouro, o que nos remete tanto ao faroeste norte-americano quanto ao Bandido da Luz Vermelha de Rogério Sganzerla.
            </p>
            <p>
              Solon encara estas imagens-lembranças (o imaginário colonizado) não como algo a ser rememorado de forma lívida em busca de uma inocência passada, mas pelo contrário, como um pesadelo que deve ser combatido. Ao invés de ater-se no círculo mágico da memória afetiva, fundindo memória pessoal e memória coletiva, como Walter Benjamin em “Desempacotando minha biblioteca”, Solon prefere, como ele mesmo diz, a “consagração da perda da aura” para, através de uma violência visceral e iconoclasta, fazer-se veículo (“operador mais do que autor-criador”) de uma reencarnação aterrorizante da imagem. As imagens aqui dizem, como o monstro criado por Victor Frankenstein: “eu poderia ter sido o seu adão, mas tornei o seu anjo caído” (o seu demônio). É curioso, neste sentido, pensar que o monstro de Frankenstein teria sido criado a partir de corpos de cadáveres diferentes e ganhado vida a partir de um choque elétrico, assim como os monstros de Solon Ribeiro e (veremos mais abaixo) Peter Tscherkassky.
            </p>
            <p>
              Solon desmonta as relações que o arquivista e o colecionador (cada qual à sua maneira) estabelecem com o passado. Ao invés de tornar-se zelador do arquivo (ainda que todos os arquivistas e colecionadores possuam uma violência velada inevitável com relação ao material acumulado), Solon prefere dizer-se “descolecionador” ou “deslocador”, ressignificando e profanando o sagrado – no caso, o arquivo de seu pai. Solon banha a memória no esquecimento, transformando cada lembrança em um efeito. Daí o título da última obra da série: “Perdeu a memória e matou o cinema”. Pois, se por um lado Solon libera as imagens, tornando-as mais espantosas pois desprovidas do limites de um quadro narrativo próprio aos filmes de origem, por outro, ele não as insere numa nova narrativa (que seria a do arquivo ou coleção). Ao contrário, ele destrói tanto o fluxo fílmico quanto a espacialização das imagens típica do arquivo, para inserir as imagens num puro devir, lançando os fotogramas no caos quotidiano para que do caos eles possam voltar a nós (num eterno retorno) feito demônios que nos observam (de acordo com a lógica do “olhar de volta”).
            </p>
            <p>
              Como vimos ao tratar das fantasmagorias de Rosangela Rennó, Hayao (que opera seus sintetizadores para extrair da Zona suas não-imagens) é descrito por Chris Marker como um fanático. Poderíamos dizer o mesmo de Solon que usa o projetor e os corpos para dar carne aos fotogramas, reencantando o material não através de uma exposição em vitrines ou de um deslocamento parcial, mas através de um deslocamento vibratório radical: dar vida ao passado no presente projetando na carne viva a fotografia de um morto. Os fotogramas tornaram-se outra coisa que não imagens. Se deformam de acordo com os novos lugares onde são projetados e os novos corpos que possuem. Ao ganharem novos corpos, passam por uma deformação topológica irreversível: uma catástrofe.
            </p>
            <p>
              Mas é interessante notar a diferença desta forma de fantasmagoria com relação à de Rosangela Rennó e Chris Marker. É como se no caso de Rosangela e Marker as imagens tivessem perdido seu suporte (se tornando menos do que uma imagem) e no caso de Solon elas tivessem ganhado um novo corpo (se tornando mais do que uma imagem). Do ectoplasma das fotografias de espíritos passamos à materialidade pura da morte. O que é uma utopia poética em Feco Hambúrguer – projeção sobre novos suportes beirando a imaterialidade – em Solon torna-se uma realização através da carne. Mas para que tal coisa seja possível, é necessário banhar-se de sangue. E neste movimento de liberação das imagens, Solon realiza uma passagem da imagem fotogramatica enquanto cópia a uma imagem que, perdendo seu referencial externo e ganhando um novo corpo, faz-se simulacro.
            </p>
            <p>
              Poderíamos aproximar os pesadelos de Solon aos cinemas (tão diferentes) de David Cronenberg e Peter Tscherkassky. Em Outer Space de Peter Tscherkassky (filme feito com imagens tomadas do filme de terror The Entity, de Sidney Furie) uma mulher é estuprada por fantasmas. Enquanto isso o realizador estupra o filme. Vemos tesouras passando por fotogramas. Vemos o som óptico aparecer na tela do cinema. E a mulher fugindo de seres invisíveis, foge na verdade do próprio diretor de cinema que estupra a película. Da mesma forma os filmes de Solon destripam as imagens. No abatedouro vemos Janet Leigh projetada sobre uma carne de boi que é cortada em dois por uma serra elétrica. Mal o fotograma renasce e já volta à ser assassinado².
            </p>
            <p>
              Já nos filmes de David Cronenberg temos uma série de cientistas malucos que, através de seus experimentos, buscam dar carne a suas pulsões. Nestes filmes o medo (The Brood), a imagem televisiva (Videodrome) ou a informação (A Mosca) possuem toda uma corporeidade, encarnando em seres monstruosos. Há três ideias que se fundem nestes filmes. A ideia de que uma imagem mental ou midiática tem o poder de alterar a carne. A ideia de que estas imagens podem vir a não apenas alterar um corpo, mas gerar novos corpos independentes, livres. E finalmente, a ideia de que o poder desta transmutação das imagens em corpos emana de uma “substância morte” (algo semelhante ao que diz Chris Marker com relação às não-imagens virem de uma Zona ou catacumba digital). Não é à toa que Raymond Bellour associa, em seu texto La double hélice, as imagens de Cronenberg à expansão da cirurgia plástica nos anos 80. Poderíamos, da mesma forma, relacionar o transcinema de Solon à enorme quantidade de cirurgias plásticas feitas no Brasil.
            </p>
            <p>
              Em O Golpe do Corte, as imagens buscam novos corpos que possam ser por elas habitados. São imagens lunáticas que possuem algo de vampiresco. Que vagam pelo mundo em busca de um hospedeiro, como Lilith, que foi a primeira mulher criada por Deus, e logo negada por Adão, que não a reconheceu como humana, pois não teria sido feita da mesma carne que a sua. Deus criou então Eva da carne de Adão, enquanto Lilith passou a vagar pelo mundo, querendo procriar com algum ser que a reconhecesse. Para tal, ela passou a adquirir a forma de íncubos e sucumbis que penetram nos sonhos das pessoas para fecundar as mulheres e roubar o esperma dos homens. Trata-se, portanto, de um mito de horror que fala de um ser não humano que causa repulsa justamente por assemelhar-se extremamente ao ser humano sem, no entanto, sê-lo – como um vampiro. Seria o mito de Lilith, portanto, o primeiro mito a tratar de um simulacro?
            </p>
            <p>
              A arte contemporânea tem como característica principal a criação de um mundo de imagens dentro do qual podemos habitar e não apenas contemplar. Enquanto, na Odisséia, Ulisses se amarra no mastro do navio para poder ouvir as sereias sem se deixar levar por elas (contemplar sem habitar), A Invenção de Morel (de Adolfo Bioy Casares) e Moby Dick (de Herman Melville) tratam da tentativa mesma de entrar no mundo das imagens, de se deixar levar pelo simulacro. Já em O Golpe do Corte temos imagens que vêm elas mesmas até nós, sem precisarmos ir até elas como nos livros de Casares e Melville. Sem percebermos, nos tornamos objetos do olhar do simulacro (um olhar de Medusa que tudo captura e petrifica).
            </p>
            <p>
              Assim, as imagens clichês usadas por Solon são imagens que nos olham e buscam sua identidade em nosso olhar. Em busca de uma humanidade, são simulacros que, como Lilith, vieram do mundo dos mortos para capturar a nossa alma. Imagens que deixaram de ser cópias (já não se referem a filme algum), tornando-se inimigos ainda mais potentes que os clichés – imagens carnais e carnívoras (imagens canibais) como os Langoliers (devoradores do tempo) de Stephen King.
            </p>
            <p>
              O chamado da morte – feito por um animal, uma máquina ou uma imagem cliché que entra em contato conosco através de um efeito, um ardil –, sua fala, seu olhar, são uma virtualidade pura que tenta nos capturar. Podemos comparar esta experiência de uma imagem que nos olha ou uma máquina que nos fala, à descrição feita por Viveiros de Castro do encontro entre os índios e as alteridades-espíritos.
            </p>
            <blockquote className="border-l-4 border-[#B1D8C4] pl-4 italic my-6">
              “Um dos traumas típicos, no mundo indígena, envolve uma saída solitária de uma pessoa ao mato, para caçar por exemplo, a qual desemboca no encontro repentino com esses germes, essas larvas de Estado que são as alteridades-espírito, as agências sobrenaturais com o poder de nos contra-definir: “Aqui o sujeito sou eu. Você não é humano coisa nenhuma. Venha para mim, torne-se um de nós”.” (VIVEIROS DE CASTRO, 2007, p. 232)
            </blockquote>
            <p>
              Viveiros de Castro chama este encontro com a morte (através de um diálogo ou troca de olhares) de quase-experiência. Não podemos narrar a morte sem termos morrido. Mas se morremos, tampouco poderemos voltar para contar como foi. E ainda assim, narramos a morte porque a quase-experimentamos. A única coisa que podemos narrar é, portanto, esta quase-morte. A quase-experiência está na base das narrativas ao mesmo tempo que precede e extrapola toda narrativa. É o ilocalizável e inenarrável (o virtual) por detrás do que é narrado. Da não-imagem e do simulacro emana, assim, uma quasidade – sobrenatural enquanto virtualidade pura:
            </p>
            <blockquote className="border-l-4 border-[#B1D8C4] pl-4 italic my-6">
              “O sobrenatural não é o imaginário, não é o que acontece em outro mundo; o sobrenatural é aquilo que quase-acontece em nosso mundo, ou melhor, ao nosso mundo, transformando-o em um quase-outro mundo. Quase-acontecer é um modo específico de acontecer, nem qualidade nem quantidade, mas “quasidade”. Não se trata de uma categoria psicológica, mas ontológica: a intensidade ou virtualidade puras. O que exatamente acontece, quando algo quase acontece? O quase-acontecer: a repetição do que não terá acontecido? (…) Em suma, creio que há uma vasta província a mapear aqui – a economia da quasidade nas ontologias indígenas. Talvez haja uma relação complexa disso com o mecanismo de conjuração- antecipação de que falam Deleuze e Guattari nos Mil platôs.” (VIVEIROS DE CASTRO, 2007, p. 239-240)
            </blockquote>
            <p>
              O mecanismo de conjuração-antecipação a que se refere Viveiros de Castro (presente no capítulo O aparelho de captura de Mil Platôs) é uma teoria que trata do surgimento do Estado como virtualidade presente já na linguagem e antes mesmo de sua atualização ou instauracão material. (DELEUZE e GUATTARI, 1979) Como dizem Deleuze e Guattari: “Existe Estado desde que existe linguagem”, ou ainda, existe Estado desde quando este é evitado e logo nomeado enquanto alteridade aterrorizante, como quasidade, como quase-experiência. Assim, o Estado é esse outro que nos aparece dizendo que é um “eu”, e que nós é que somos outros. “Aqui o sujeito sou eu. Você não é humano coisa nenhuma. Venha para mim, torne-se um de nós”. Não devemos responder, porque se respondermos, nos assujeitamos, perdendo um pouco de nossa humanidade.
            </p>
            <p>
              O Estado hoje se confunde com uma rede de imagens que nos assujeita através de uma colonização do imaginário. Podemos dizer, portanto, que são agora as imagens clichés que nos dizem “sou um sujeito”, um modelo, e “você, ser humano, é que é a cópia”. Assim, o trabalho visceral de Solon Ribeiro é talvel um dos maiores exemplos do esforço de uma série de artistas contemporâneos de extrair uma nova vitalidade a partir de uma confrontação direta com a assujeitação almejada pelo Estado das imagens clichés – no caso, as imagens de Hollywood. Mas para isso, como diz Marker, devemos aprender a conviver com o horror, extraí-lo dos clichés para evidenciar a guerra das imagens.
            </p>
            <p>
              O simulacro é mais e menos que uma cópia e a não-imagem, dos filmes de Chris Marker, mais e menos que uma imagem. Falamos também do quase-cinema tanto de Hélio Oiticica e Neville d’Almeida quanto de Solon Ribeiro. Poderíamos falar agora desse aquém e além fotográfico do cinema enquanto quasidade. Algo que busca dar uma nova vida às imagens (destacando-as dos clichês), mas que para tal necessita fazer uso de um efeito (de um fato artificial que parece emanar do mundo dos mortos), de uma quasidade que viria substituir a quantidade e a qualidade. Assim, as imagens de Solon, mas também as do efeito-cinema (imagens-feitiço) da EXPERIÊNCIA CINEMA de Rosangela Rennó extrapolam qualquer métrica (grau) e qualidade (natureza), ultrapassando os limites do real para tocar nestas alteridades-espírito, nesta quasidade tão perigosa porque anunciadora de novos regimes de poder.
            </p>
            <div className="text-sm mt-8 text-[#9B111E]">
              <p>¹ Como diz um personagem no final do filme Com o Passar do Tempo (Wim Wenders, 1976), “os americanos colonizaram o nosso inconsciente”.</p>
              <p>² Tscherkassky, feito um Doutor Frankenstein, monta seus filmes diretamente sobre o negativo em um laboratório fotográfico, de forma que demora cerca de 8 ou mais horas de trabalho para alterar apenas dois segundos de película. Certa vez Tscherkassky disse irritado, em uma conferência na mostra de cinema experimental Xperimenta (Barcelona, 2009), que “se vocês teimam em dizer que o cinema está morto, ao menos deixem-me tentar ressucitá-lo com eletrochoques!”</p>
            </div>
          </section>

          <hr className="border-[#B1D8C4]/50 my-16" />

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Solon Ribeiro, He killed cinema, photography and art in the cut stroke</h2>
            <p className="text-sm uppercase tracking-widest mb-8 text-[#B71C1C]">Texto: Ricardo Resende (Curator, Museu Bispo do Rosario Arte Comtemporânea)</p>
            
            <p>
              Solon Ribeiro (1960) is pursued by cinema. In fact, it must be a torment the inheritance of 20.000 frames extracted from films from the 1920s to the 1960s, inherited from his father. A thorough action by the film designer, the action of gathering thousands of images of actresses, actors and scenes from the Golden Age of cinematography.
            </p>
            <p>
              What to do with this collection of frames, the memory of four decades of collecting "stolen" images of the films that marked the life of generations of viewers? What destiny to give to this immense weight these frames mean, which, decontextualized when being cut out of the films, cease to be frames (the 24th part of a second of a movie)? It is the sequenced part that gives the idea of movement captured by the cinema. Out of the film, it's just a photograph. Nothing more than a fragment of the past tense.
            </p>
            <p>
              As in every picture, these frames are also about death. The photography and death walked together. The photo is past. It is the record of what has already passed, of what has already died. Therefore, when looking at the portraits of those actresses and actors, we are taken by an inevitable feeling of melancholy. There is a weight in the meaning of these images. And it is with this weight that Solon has been doing his imagery. Giving freedom, giving autonomy and a new meaning to this bank of images.
            </p>
            <p>
              It does not interest him what the images were or represented, and yes, what they do may become now, once they are in his hands.
            </p>
            <p>
              It is the struggle waged in the film The Cut Stroke, where the artist appears debating with these images at the end. He is in the quest to create other resting places or to raise new flights for them. The artists’s images, as well as Solon’s, arise in this filmic battle as spectral ghosts of a past era.
            </p>
            <p>
              Solon Ribeiro is an artist of the family of the unclassifiable. He does not fit into any category of traditional art. In the same way, what he does as art is not also anything placed in a drawer. There is no category that can fit the work that has been planned and carried out in Fortaleza. A dream place of existence with its intense light and the Aracati wind that transforms everything by bringing freshness to the scorching heat of the region. He does not let the thought settle, he is a whirlwind of things that removes everything from its place. This is the sensation when listening to the artist who still has a biased look when facing his interlocutor.
            </p>
            <p>
              In 2016, the artist was contemplated with the Project The Cut Stroke at Rumos Itaú Cultural, in which he proposed the preservation, digitization, cataloging and publication of this collection of frames that he inherited from his father, who, in turn, inherited from his grandfather Ubaldo Uberaba Solon. The collection has passed from father to son for three generations.
            </p>
            <p>
              Solon Ribeiro's family had projection rooms in the interior of Ceará. Solon’s grandfather put together a huge selection of frames throughout his life. He awakened in them, son and grandson, the taste for cinema and the collecting will. A desire to accumulate images from father to son. Although the artist, unlike the grandfather, is an “uncollector”.
            </p>
            <p>
              Solon keeps in this collection of frames the memory of the collected filmography by the projectionist, from the films of an era that glazed entire audiences. There were generations and generations that lived in fascination before the display screens.
            </p>
            <p>
              The father was a sort of a film scavenger when he removed, from the movies, frames that froze a glance, a smile, a cry, a gesture, the amazement, surprise, fear, hatred, strife, a situation, a tear, a kiss. Images of human representation. He has put together thousands of frames where he wanted to freeze the sequence of pictures, choosing scenes where the faces of acclaimed actresses and actors from Hollywood appeared. These were the decades of cinema's heyday. Magical, he carried throngs of followers into the projection rooms.
            </p>
            <p>
              Admittedly, there is a dose of madness in people and artists who accumulate. Some, because they cannot detach themselves from the things of a life, they become accumulators. Others collect or store things they encounter through life. They build, collect, rescue, guard, accumulate and preserve, and everything becomes a collection. The collector of these cinematic images removed what he was going to save among millions of frames that made up a long-running film, it was pure magic.
            </p>
            <p>
              The work, this collection of images, makes margin with art in the artistic gesture of collecting and putting things together. And as an image alchemist, Solon does now his artwork from this collection. The work that constitutes is derived from photography, performance, photographic actions and the mind-boggling thoughts that populate his speech, dreams and ghosts. Everything that inhabits him.
            </p>
            <p>
              The exhibit at MIS is composed by the transformation of these frames into videos and photographic images, which seems to be the artist's desire to exorcise this heritage that he carries throughout his life. In his hands, the frames are shifted, giving them new direction in the form of installations and performative projections. He thus creates new movies, new contexts for the scenes and expressions that were once registered. A kiss, a look, a smile, a body, a face, a frozen gesture...
            </p>
            <p>
              What Solon does today is nothing more than the jokes he made when he was a child with these images simulating movie theaters, built of shoe boxes. It was there that he learned how to deal with this collection and now turn it into his work of art. Re-signifying it and creating new narratives. Now turning into fantastic images. Voices from the unconscious and from the disconnected speech. Someone stole his memories.
            </p>
            <p>
              Solon lost consciousness in Lost Memory and killed Cinema. A resumption of the cinema and of those games that he did as a child. Na invented cinema from the frames, creating new narratives by bringing them to other contexts outside the projection rooms. Performance photography in surrealistic situations, that’s what he creates with the new characters.
            </p>
            <p>
              The dream architect, filmed in the cell where Bispo do Rosário lived, in Juliano Moreira Colony, another dreams accumulator, is a film that plays with the memory of the artist from Sergipe. Solon enters the labyrinth of Bispo’s memory, rescuing images of the abandoned and decomposing place, already in ruins.
            </p>
            <p>
              Hallucination! Shadows. Ghosts. Night. Spectra. Courting a fable of the enchanted place. Of pulsating memory. Of memories that refuse to be erased by time.
            </p>
            <p>
              At some point in the film, the ghost of the robe that the crazy artist made to talking to God hangs over the shadow of the night. Like the soul of the artist who reached the sky, Solon returns to Bispo the right to speak to God, tied up as his desire was. Now he goes along with other images of artists wearing his cloak. Solon returns him to the gates of heaven in the company of other ghosts.
            </p>
            <p>
              Collage over collage. Image over image populate the labyrinths of the mind. Delirium. Visions. Faces. Survival. Survivals. Images rescued from the basements of the cinema. The Cloak with the movie icons. Bispo is an icon of the anonymous. The one who had his persona stolen when he was isolated in an insane asylum. The place that was the destination of the crazy ones, the artists, the whores, the queers, the black men, the single mothers, the communists. The abandoned icons by society.
            </p>
            <p>
              The Mantle appears as a moth with open wings that inhabits the dark of the night, projected over the ruins of the place. A woman's face is projected onto the projection. Projection on projection. Collage of images. The sonorization of the movie at the same time nostalgic and melancholic is also disconcerting. With his defiance, he reaffirms the estrangement and deconstruction of place and images. The same happens with Lost Memory and killed Cinema, a movie from the movie, a movie about another movie.
            </p>
            <p>
              Solon redo cinema by releasing cinema from the cinema itself. It is pure poetry of Image. He releases the films we carry within us. Memory as movies are the many films we inhabit.
            </p>
            <div className="text-sm mt-8 text-[#9B111E]">
              <p>¹ The "Aracati wind" runs more than 300 kilometers every day. Channeled by the Jaguaribe River, it composes the real and the imaginary dimension of the people of the área (the so-called “sertanejos”), well before being portrayed in the novel Iracema, by the writer José de Alencar.</p>
            </div>
          </section>

          <hr className="border-[#B1D8C4]/50 my-16" />

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Portfólio & Séries</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>O GOLPE DO CORTE - 2006</li>
              <li>MYXOMATOSIS - 2008</li>
              <li>TECNICPOPPHOTOGRAPH - 2015</li>
              <li>FOTOGRAMAS VISITADO PELOS ARTISTAS DO POLO EXPERIMENTAL / MUSEU BISPO DO ROSARIO - 2016</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Publicações</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Perdeu a memória matou o cinema.</li>
              <li>"Lambe-Lambe", pequena História da Fotografia Popular.</li>
              <li>Golpe do Corte.</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Principais Exposições Individuais</h2>
            <ul className="space-y-2">
              <li><strong>2015</strong> - PERDEU A MEMÓRIA E MATOU O CINEMA – Galeria Athena Contemporanea – Rio de Janeiro.</li>
              <li><strong>2014</strong> - “O Cinema é Meu Playground” - MAC Centro Dragão do Mar – Fortaleza/CE.</li>
              <li><strong>2010</strong> - Quando o cinema se desfaz em fotograma - Galeria Virgílio - São Paulo/SP.</li>
              <li><strong>2010</strong> - Hélio Oiticica em mitos vadios - Museu de Arte Moderna Aloísio Magalhães - Recife/PE.</li>
              <li><strong>2009</strong> - Quando o cinema se desfaz em fotograma - Funarte – Rio de Janeiro/RJ.</li>
              <li><strong>2009</strong> - Quando o cinema se desfaz em fotograma - Centro Cultural Banco do Nordeste - Fortaleza/CE.</li>
              <li><strong>2006</strong> - Mitos vadios – Anotações Fotográficas – MAC Centro Dragão do Mar – Fortaleza/CE.</li>
              <li><strong>2006</strong> - O Golpe do Corte – Centro Cultural Banco do Nordeste – Fortaleza/CE.</li>
              <li><strong>1999</strong> - ENTREFOTOS – Museu de Arte Contemporânea – João Pessoa/PB.</li>
              <li><strong>1998</strong> - Vida e Morte da fotografia – Galeria Zelinda Lima – São Luis/MA.</li>
              <li><strong>1997</strong> - Vida e Morte da fotografia – Tele ceará – Fortaleza/CE.</li>
              <li><strong>1990</strong> - A Revolução Passando – Galeria da Aliança Francesa – Fortaleza/CE.</li>
              <li><strong>1990</strong> - Duchamp, Yves Klein, Andy Warhol, Visto por: Solon Ribeiro Galeria L"art Modest – Paris/FRANÇA.</li>
              <li><strong>1990</strong> - Eu Sou a Máquina – ENSAD – Paris/FRANÇA.</li>
              <li><strong>1985</strong> - A Procura de uma foto-Rock – Brasília/DF.</li>
              <li><strong>1983</strong> - Aí de Mim Cultura – Fortaleza/CE.</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Principais Coletivas</h2>
            <ul className="space-y-2">
              <li><strong>2016</strong> - Das Virgens em Cardumes e da Cor das Auras, Museu Bispo do Rosário, Rio de Janeiro.</li>
              <li><strong>2016</strong> - “Marimbondo e Orquídea” - (MAC-CE), do Centro Dragão do Mar de Arte e Cultura – Fortaleza –Ce.</li>
              <li><strong>2016</strong> - “Encontros” – Galeria índica Arte e Design – Rio de Janeiro.</li>
              <li><strong>2016</strong> - ‘Bângala Yaka Aye’ - Galeria Gentil Carioca – Rio de Janeiro.</li>
              <li><strong>2015</strong> - Panoramas Do Sul 19º Festival de arte contemporânea Sesc_Videobrasil - São Paulo.</li>
              <li><strong>2015</strong> - Tempo Movimento - VI Premio Diário Contemporâneo de Fotografia – Espaço Cultural Casa das Onze Janelas – Belém –PA.</li>
              <li><strong>2015</strong> - “TRANSBORDA” - Casa Triângulo- São Paulo.</li>
              <li><strong>2014</strong> - Artistas Comprometidos? Talvez - Fundação Calouste Gulbenkian – Lisboa - Portugal</li>
              <li><strong>2014</strong> - “Tatu” - Museu de Arte do Rio (MAR) – Rio de Janeiro.</li>
              <li><strong>2014</strong> - “Carneiro” (MAC-CE), do Centro Dragão do Mar de Arte e Cultura – Fortaleza –Ce.</li>
              <li><strong>2014</strong> - TELEFONE SEM FIO OIAPOQUE CHUI – Centro Cultural Banco do Nordeste - Fortaleza –Ce.</li>
              <li><strong>2013</strong> - Arte Pará – Belém PA.</li>
              <li><strong>2012</strong> - Through the Surface of the pages – David Rockefeller Center for Latin American Studies - Boston/ EUA</li>
              <li><strong>2011</strong> - Caos e efeito/ Itaú Cultural, São Paulo.</li>
              <li><strong>2011</strong> - Festival Performance Arte Brasil – Museu de Arte do Rio de Janeiro.</li>
              <li><strong>2011</strong> - De casa para o mundo Do mundo para casa - MAC do Centro Dragão do Mar – Fortaleza/CE.</li>
              <li><strong>2011</strong> - Exposição Coletiva Dos Artistas Representados Pela Galeria - Galeria Virgílio - São Paulo/SP.</li>
              <li><strong>2008</strong> - Circuito Intensivo - Funarte, Alpendre - Fortaleza/CE.</li>
              <li><strong>2007</strong> - Arte Pará - Belém/PA.</li>
              <li><strong>2007</strong> - A Fotografia em Perspectiva – Museu de arte moderna - São Paulo/SP.</li>
              <li><strong>2005</strong> - Viva a Natureza Morta – MAC do Centro Dragão do Mar – Fortaleza/CE.</li>
              <li><strong>2003</strong> - 56° Salão de Abril – Fortaleza/CE.</li>
              <li><strong>2003</strong> - Experimental - MAC Centro Dragão do Mar – Fortaleza/CE.</li>
              <li><strong>2003</strong> - FOTOARTE – Galeria de Arte Vicente Leite – Fortaleza/CE.</li>
              <li><strong>2000</strong> - "Fotografia no Espelho" – Museu de Arte Moderna – São Paulo/SP.</li>
              <li><strong>1999</strong> - Bienal Norte e Nordeste de Fotografia – Sobral/CE.</li>
              <li><strong>1999</strong> - V Prêmio CDL de Artes Plásticas – Fortaleza/CE.</li>
              <li><strong>1993</strong> - 44° Salão de Abril – Fortaleza/CE.</li>
              <li><strong>1991</strong> - Perto do Coração Selvagem – Galeria Aspekte – Munique/Alemanha.</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Obras em Acervos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Museu de arte moderna - São Paulo/SP.</li>
              <li>Museu de Arte Contemporânea do Centro Dragão do Mar – Fortaleza/CE.</li>
              <li>Funarte - Fundação Nacional de Arte - Rio de Janeiro/RJ.</li>
              <li>Centro Cultural Banco do Nordeste – Fortaleza/CE.</li>
              <li>Museu de Belas Artes - Rio de Janeiro/RJ.</li>
              <li>Museu de Arte Moderna Aluísio Magalhães - Recife/PE.</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Press</h2>
            <ul className="space-y-2">
              <li><strong>16-07-2010</strong> - Revista ISTO É: N° Edição: 2123 - Janelas do cinema - Artistas derrubam fronteiras entre cinema, vídeo e artes plásticas em três exposições.</li>
              <li><strong>06-07-2010</strong> - ART|REF - referência e notícias em arte contemporânea - www.arteref.com - Solon Ribeiro na Virgilio.</li>
              <li><strong>23-12-2009</strong> - O GLOBO - Reinventando o cinema da infância.</li>
              <li><strong>21-12-2009</strong> - FUNARTE - PORTAL DAS ARTES - "Quando o cinema se desfaz em fotograma".</li>
              <li><strong>19-11-2009</strong> - O POVO - CADERNO VIDA & ARTE - Alguma coisa está fora de ordem.</li>
              <li><strong>20-10-2009</strong> - DIÁRIO DO NORDESTE - CADERNO 3 - A vida em celulóide.</li>
              <li><strong>03-04-2008</strong> - DIÁRIO DO NORDESTE - CADERNO 3 - Eu e os meus fotogramas.</li>
              <li><strong>08-06-2005</strong> - DIÁRIO DO NORDESTE - CADERNO 3 - Cortes dinâmicos.</li>
              <li><strong>28-06-2000</strong> - JORNAL DO BRASIL - CADERNO B - Cinema Paradiso do Sertão.</li>
            </ul>
          </section>

        </div>
      </article>

      <Footer />
    </main>
  );
}
