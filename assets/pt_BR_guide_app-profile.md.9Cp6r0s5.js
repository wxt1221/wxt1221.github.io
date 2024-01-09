import{_ as e,o as s,c as o,R as a}from"./chunks/framework.EUU6lLMq.js";const k=JSON.parse('{"title":"Perfil do Aplicativo","description":"","frontmatter":{},"headers":[],"relativePath":"pt_BR/guide/app-profile.md","filePath":"pt_BR/guide/app-profile.md"}'),i={name:"pt_BR/guide/app-profile.md"},r=a(`<h1 id="perfil-do-aplicativo" tabindex="-1">Perfil do Aplicativo <a class="header-anchor" href="#perfil-do-aplicativo" aria-label="Permalink to &quot;Perfil do Aplicativo&quot;">​</a></h1><p>O Perfil do Aplicativo é um mecanismo fornecido pelo KernelSU para personalizar a configuração de vários apps.</p><p>Para apps com permissões de root (ou seja, capazes de usar <code>su</code>), o Perfil do Aplicativo também pode ser chamado de Perfil Root. Ele permite a customização das regras <code>uid</code>, <code>gid</code>, <code>groups</code>, <code>capabilities</code> e <code>SELinux</code> do comando <code>su</code>, restringindo assim os privilégios do usuário root. Por exemplo, ele pode conceder permissões de rede apenas para apps de firewall enquanto nega permissões de acesso a arquivos, ou pode conceder permissões de shell em vez de acesso root completo para apps congelados: <strong>mantendo o poder confinado com o princípio do menor privilégio.</strong></p><p>Para apps comuns sem permissões de root, o Perfil do Aplicativo pode controlar o comportamento do kernel e do sistema de módulos em relação a esses apps. Por exemplo, pode determinar se as modificações resultantes dos módulos devem ser abordadas. O kernel e o sistema de módulos podem tomar decisões com base nesta configuração, como realizar operações semelhantes a &quot;ocultar&quot;</p><h2 id="perfil-root" tabindex="-1">Perfil Root <a class="header-anchor" href="#perfil-root" aria-label="Permalink to &quot;Perfil Root&quot;">​</a></h2><h3 id="uid-gid-e-grupos" tabindex="-1">UID, GID e Grupos <a class="header-anchor" href="#uid-gid-e-grupos" aria-label="Permalink to &quot;UID, GID e Grupos&quot;">​</a></h3><p>Os sistemas Linux possuem dois conceitos: usuários e grupos. Cada usuário possui um ID de usuário (UID) e um usuário pode pertencer a vários grupos, cada um com seu próprio ID de grupo (GID). Esses IDs são usados ​​para identificar usuários no sistema e determinar quais recursos do sistema eles podem acessar.</p><p>Os usuários com UID 0 são conhecidos como usuários root e os grupos com GID 0 são conhecidos como grupos root. O grupo de usuários root normalmente possui os privilégios de sistema mais altos.</p><p>No caso do sistema Android, cada app é um usuário separado (excluindo cenários de UID compartilhados) com um UID exclusivo. Por exemplo, <code>0</code> representa o usuário root, <code>1000</code> representa <code>system</code>, <code>2000</code> representa o ADB shell e UIDs variando de <code>10.000</code> a <code>19.999</code> representam apps comuns.</p><div class="info custom-block"><p class="custom-block-title">INFORMAÇÕES</p><p>Aqui, o UID mencionado não é o mesmo que o conceito de múltiplos usuários ou perfis de trabalho no sistema Android. Os perfis de trabalho são, na verdade, implementados particionando o intervalo UID. Por exemplo, 10000-19999 representa o usuário principal, enquanto 110000-119999 representa um perfil de trabalho. Cada app comum entre eles possui seu próprio UID exclusivo.</p></div><p>Cada app pode ter vários grupos, com o GID representando o grupo principal, que geralmente corresponde ao UID. Outros grupos são conhecidos como grupos suplementares. Certas permissões são controladas por meio de grupos, como permissões de acesso à rede ou acesso Bluetooth.</p><p>Por exemplo, se executarmos o comando <code>id</code> no ADB shell, a saída pode ser semelhante a esta:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">oriole:/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">shell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) gid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">shell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) groups</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">shell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1004</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1007</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1011</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">adb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1015</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sdcard_rw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1028</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sdcard_r</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1078</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ext_data_rw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,1079</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ext_obb_rw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3001</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net_bt_admin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3002</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net_bt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3003</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3006</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net_bw_stats</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3009</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readproc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3011</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">uhid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,3012</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readtracefs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) context</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">u:r:shell:s0</span></span></code></pre></div><p>Aqui, o UID é <code>2000</code> e o GID (ID do grupo primário) também é <code>2000</code>. Além disso, pertence a vários grupos suplementares, como <code>inet</code> (indicando a capacidade de criar soquetes <code>AF_INET</code> e <code>AF_INET6</code>) e <code>sdcard_rw</code> (indicando permissões de leitura/gravação para o cartão SD).</p><p>O Perfil Root do KernelSU permite a personalização do UID, GID e grupos para o processo root após a execução de <code>su</code>. Por exemplo, o Perfil Root de um app root pode definir seu UID como <code>2000</code>, que significa que ao usar <code>su</code>, as permissões reais do app estão no nível do ADB shell. O grupo <code>inet</code> pode ser removido, evitando que o comando <code>su</code> acesse a rede.</p><div class="tip custom-block"><p class="custom-block-title">OBSERVAÇÃO</p><p>O Perfil do Aplicativo controla apenas as permissões do processo root após usar <code>su</code>, e ele não controla as permissões do próprio app. Se um app solicitou permissão de acesso à rede, ele ainda poderá acessar a rede mesmo sem usar <code>su</code>. Remover o grupo <code>inet</code> de <code>su</code> apenas impede que <code>su</code> acesse a rede.</p></div><p>O Perfil Root é aplicado no kernel e não depende do comportamento voluntário de apps root, ao contrário da troca de usuários ou grupos por meio de <code>su</code> A concessão da permissão <code>su</code> depende inteiramente do usuário e não do desenvolvedor.</p><h3 id="capacidades" tabindex="-1">Capacidades <a class="header-anchor" href="#capacidades" aria-label="Permalink to &quot;Capacidades&quot;">​</a></h3><p>As capacidades são um mecanismo para separação de privilégios no Linux.</p><p>Para realizar verificações de permissão, as implementações tradicionais do <code>UNIX</code> distinguem duas categorias de processos: processos privilegiados (cujo ID de usuário efetivo é <code>0</code>, referido como superusuário ou root) e processos sem privilégios (cujo UID efetivo é diferente de zero). Os processos privilegiados ignoram todas as verificações de permissão do kernel, enquanto os processos não privilegiados estão sujeitos à verificação completa de permissão com base nas credenciais do processo (geralmente: UID efetivo, GID efetivo e lista de grupos suplementares).</p><p>A partir do Linux 2.2, o Linux divide os privilégios tradicionalmente associados ao superusuário em unidades distintas, conhecidas como capacidades, que podem ser ativadas e desativadas de forma independente.</p><p>Cada capacidade representa um ou mais privilégios. Por exemplo, <code>CAP_DAC_READ_SEARCH</code> representa a capacidade de ignorar verificações de permissão para leitura de arquivos, bem como permissões de leitura e execução de diretório. Se um usuário com um UID efetivo <code>0</code> (usuário root) não tiver recursos <code>CAP_DAC_READ_SEARCH</code> ou superiores, isso significa que mesmo sendo root, ele não pode ler arquivos à vontade.</p><p>O Perfil Root do KernelSU permite a personalização das capacidades do processo root após a execução de <code>su</code>, conseguindo assim conceder parcialmente &quot;permissões de root&quot;. Ao contrário do UID e GID mencionados acima, certos apps root exigem um UID de <code>0</code> após usar <code>su</code>. Nesses casos, limitar as capacidades deste usuário root com UID <code>0</code> pode restringir suas operações permitidas.</p><div class="tip custom-block"><p class="custom-block-title">FORTE RECOMENDAÇÃO</p><p>A <a href="https://man7.org/linux/man-pages/man7/capabilities.7.html" target="_blank" rel="noreferrer">documentação oficial</a> da Capacidade do Linux fornece explicações detalhadas das habilidades representadas por cada Capacidade. Se você pretende customizar Capacidades, é altamente recomendável que você leia este documento primeiro.</p></div><h3 id="selinux" tabindex="-1">SELinux <a class="header-anchor" href="#selinux" aria-label="Permalink to &quot;SELinux&quot;">​</a></h3><p>SELinux é um poderoso mecanismo do Controle de Acesso Obrigatório (MAC). Ele opera com base no princípio de <strong>negação padrão</strong>. Qualquer ação não explicitamente permitida é negada.</p><p>O SELinux pode ser executado em dois modos globais:</p><ol><li>Modo permissivo: Os eventos de negação são registrados, mas não aplicados.</li><li>Modo de aplicação: Os eventos de negação são registrados e aplicados.</li></ol><div class="warning custom-block"><p class="custom-block-title">AVISO</p><p>Os sistemas Android modernos dependem fortemente do SELinux para garantir a segurança geral do sistema. É altamente recomendável não usar nenhum sistema personalizado executado em &quot;Modo permissivo&quot;, pois não oferece vantagens significativas em relação a um sistema completamente aberto.</p></div><p>Explicar o conceito completo do SELinux é complexo e está além do objetivo deste documento. Recomenda-se primeiro entender seu funcionamento através dos seguintes recursos:</p><ol><li><a href="https://en.wikipedia.org/wiki/Security-Enhanced_Linux" target="_blank" rel="noreferrer">Wikipédia</a></li><li><a href="https://www.redhat.com/pt-br/topics/linux/what-is-selinux" target="_blank" rel="noreferrer">Red Hat: O que é SELinux?</a></li><li><a href="https://wiki.archlinux.org/title/SELinux" target="_blank" rel="noreferrer">ArchLinux: SELinux</a></li></ol><p>O Perfil Root do KernelSU permite a personalização do contexto SELinux do processo root após a execução de <code>su</code>. Regras específicas de controle de acesso podem ser definidas para este contexto para permitir um controle refinado sobre as permissões de root.</p><p>Em cenários típicos, quando um app executa <code>su</code>, ele alterna o processo para um domínio SELinux com <strong>acesso irrestrito</strong>, como <code>u:r:su:s0</code>. Através do Perfil Root, este domínio pode ser mudado para um domínio personalizado, como <code>u:r:app1:s0</code>, e uma série de regras podem ser definidas para este domínio:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">enforce</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">typeattribute</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mlstrustedsubject</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">allow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span></span></code></pre></div><p>Observe que a regra <code>allow app1 * * *</code> é usada apenas para fins de demonstração. Na prática, esta regra não deve ser utilizada extensivamente, pois não difere muito do Modo permissivo.</p><h3 id="escalacao" tabindex="-1">Escalação <a class="header-anchor" href="#escalacao" aria-label="Permalink to &quot;Escalação&quot;">​</a></h3><p>Se a configuração do Perfil Root não estiver definida corretamente, poderá ocorrer um cenário de escalação. As restrições impostas pelo Perfil Root poderão falhar involuntariamente.</p><p>Por exemplo, se você conceder permissão root a um usuário ADB shell (que é um caso comum) e, em seguida, conceder permissão root a um app normal, mas configurar seu Perfil Root com UID 2000 (que é o UID do usuário ADB shell), o app pode obter acesso root completo executando o comando <code>su</code> duas vezes:</p><ol><li>A primeira execução <code>su</code> está sujeita à aplicação do Perfil do Aplicativo e mudará para UID <code>2000</code> (ADB shell) em vez de <code>0</code> (root).</li><li>A segunda execução <code>su</code>, como o UID é <code>2000</code> e você concedeu acesso root ao UID <code>2000</code> (ADB shell) na configuração, o app obterá privilégio de root completo.</li></ol><div class="warning custom-block"><p class="custom-block-title">OBSERVAÇÃO</p><p>Este comportamento é totalmente esperado e não é um bug. Portanto, recomendamos o seguinte:</p><p>Se você realmente precisa conceder permissões de root ao ADB (por exemplo, como desenvolvedor), não é aconselhável alterar o UID para <code>2000</code> ao configurar o Perfil Root. Usar <code>1000</code> (system) seria uma melhor escolha.</p></div><h2 id="perfil-nao-root" tabindex="-1">Perfil não Root <a class="header-anchor" href="#perfil-nao-root" aria-label="Permalink to &quot;Perfil não Root&quot;">​</a></h2><h3 id="desmontar-modulos" tabindex="-1">Desmontar módulos <a class="header-anchor" href="#desmontar-modulos" aria-label="Permalink to &quot;Desmontar módulos&quot;">​</a></h3><p>O KernelSU fornece um mecanismo sem sistema para modificar partições do sistema, obtido através da montagem de overlayfs. No entanto, alguns apps podem ser sensíveis a esse comportamento. Assim, podemos descarregar módulos montados nesses apps configurando a opção “desmontar módulos”.</p><p>Além disso, a interface de configurações do gerenciador KernelSU fornece uma opção para &quot;desmontar módulos por padrão&quot;. Por padrão, essa opção está <strong>ativada</strong>, o que significa que o KernelSU ou alguns módulos descarregarão módulos para este app, a menos que configurações adicionais sejam aplicadas. Se você não preferir esta configuração ou se ela afetar determinados apps, você terá as seguintes opções:</p><ol><li>Mantenha a opção &quot;desmontar módulos por padrão&quot; e desative individualmente a opção &quot;desmontar módulos&quot; no Perfil do Aplicativo para apps que exigem carregamento do módulo (agindo como uma &quot;lista de permissões&quot;).</li><li>Desative a opção &quot;desmontar módulos por padrão&quot; e ative individualmente a opção &quot;desmontar módulos&quot; no Perfil do Aplicativo para apps que exigem descarregamento do módulo (agindo como uma &quot;lista negra&quot;).</li></ol><div class="info custom-block"><p class="custom-block-title">INFORMAÇÕES</p><p>Em dispositivos que utilizam kernel versão 5.10 e superior, o kernel realiza o descarregamento dos módulos. No entanto, para dispositivos que executam versões de kernel abaixo de 5.10, essa opção é apenas uma opção de configuração e o próprio KernelSU não executa nenhuma ação. Alguns módulos, como ZygiskNext, podem usar essa opção para determinar se o descarregamento do módulo é necessário.</p></div>`,46),d=[r];function p(t,n,l,c,u,h){return s(),o("div",null,d)}const g=e(i,[["render",p]]);export{k as __pageData,g as default};
