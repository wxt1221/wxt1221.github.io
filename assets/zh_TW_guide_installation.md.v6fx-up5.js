import{_ as a,o as i,c as t,R as o,k as e,a as l}from"./chunks/framework.EUU6lLMq.js";const K=JSON.parse('{"title":"安裝","description":"","frontmatter":{},"headers":[],"relativePath":"zh_TW/guide/installation.md","filePath":"zh_TW/guide/installation.md"}'),r={name:"zh_TW/guide/installation.md"},n=o(`<h1 id="title" tabindex="-1">安裝 <a class="header-anchor" href="#title" aria-label="Permalink to &quot;安裝 {#title}&quot;">​</a></h1><h2 id="check-if-supported" tabindex="-1">檢查您的裝置是否受支援 <a class="header-anchor" href="#check-if-supported" aria-label="Permalink to &quot;檢查您的裝置是否受支援 {#check-if-supported}&quot;">​</a></h2><p>從 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">GitHub Releases</a> 下載 KernelSU 管理員應用程式，然後將應用程式安裝至裝置並開啟：</p><ul><li>如果應用程式顯示「不支援」，則表示您的裝置不支援 KernelSU，您需要自行編譯核心才能繼續使用，，KernelSU 官方也永遠不會為您提供一個可以刷新的 Boot 映像。</li><li>如果應用程式顯示「未安裝」，那麼 KernelSU 支援您的裝置；可以進行下一步作業。</li></ul><div class="info custom-block"><p class="custom-block-title">INFO</p><p>對於顯示「不支援」的裝置，這裡有一個<a href="./unofficially-support-devices.html">非官方支援裝置清單</a>，您可以使用這個清單裡的核心自行編譯。</p></div><h2 id="backup-boot-image" tabindex="-1">備份您的原廠 boot.img <a class="header-anchor" href="#backup-boot-image" aria-label="Permalink to &quot;備份您的原廠 boot.img {#backup-boot-image}&quot;">​</a></h2><p>在進行刷新作業前，您必須預先備份您的原廠 boot.img。如果您在後續刷新作業中出現了任何問題，您都可以透過使用 Fastboot 刷新回到原廠 Boot 以還原系統。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>刷新作業可能會造成資料遺失，請確保做好這一步再繼續進行下一步作業！！必要時您還可以備份您手機的所有資料。</p></div><h2 id="acknowage" tabindex="-1">必要知識 <a class="header-anchor" href="#acknowage" aria-label="Permalink to &quot;必要知識 {#acknowage}&quot;">​</a></h2><h3 id="adb-and-fastboot" tabindex="-1">ADB 和 Fastboot <a class="header-anchor" href="#adb-and-fastboot" aria-label="Permalink to &quot;ADB 和 Fastboot {#adb-and-fastboot}&quot;">​</a></h3><p>預設狀況下，您將會使用 ADB 和 Fastboot 工具，如果您不知道它們，建議使用搜尋引擎先瞭解相關內容。</p><h3 id="kmi" tabindex="-1">KMI <a class="header-anchor" href="#kmi" aria-label="Permalink to &quot;KMI&quot;">​</a></h3><p>KMI 全稱 Kernel Module Interface，相同 KMI 的核心版本是<strong>相容的</strong> 這也是 GKI 中「標準」的涵義所在；反之，如果 KMI 不同，那麼這些核心之間無法彼此相容，刷新與您裝置 KMI 不同的核心映像可能會導致開機迴圈。</p><p>具體來講，對 GKI 的裝置，其核心版本格式應該如下：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>KernelRelease :=</span></span>
<span class="line"><span>Version.PatchLevel.SubLevel-AndroidRelease-KmiGeneration-suffix</span></span>
<span class="line"><span>w      .x         .y       -zzz           -k            -something</span></span></code></pre></div><p>其中，<code>w.x-zzz-k</code> 為 KMI 版本。例如，一部裝置核心版本為 <code>5.10.101-android12-9-g30979850fc20</code>，那麼它的 KMI 為 <code>5.10-android12-9</code>；理論上刷新其他這個 KMI 的核心也能正常開機。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>請注意，核心版本中的 SubLevel 並非 KMI 的一部分！也就是說 <code>5.10.101-android12-9-g30979850fc20</code> 與 <code>5.10.137-android12-9-g30979850fc20</code> 的 KMI 相同！</p></div><h3 id="kernel-version-vs-android-version" tabindex="-1">核心版本與 Android 版本 <a class="header-anchor" href="#kernel-version-vs-android-version" aria-label="Permalink to &quot;核心版本與 Android 版本 {#kernel-version-vs-android-version}&quot;">​</a></h3><p>請注意：<strong>核心版本與 Android 版本並不一定相同！</strong></p><p>如果您發現您的核心版本是 <code>android12-5.10.101</code>，然而您 Android 系統的版本為 Android 13 或者其他；請不要覺得奇怪，因為 Android 系統的版本與 Linux 核心的版本號碼並非一致；Linux 核心的版本號碼一般與<strong>裝置出廠時隨附的 Android 系統的版本一致</strong>，如果後續 Android 系統更新，核心版本一般不會發生變化。如果您需要刷新，<strong>請以核心版本為準！！</strong></p><h2 id="installation-introduction" tabindex="-1">安裝簡介 <a class="header-anchor" href="#installation-introduction" aria-label="Permalink to &quot;安裝簡介 {#installation-introduction}&quot;">​</a></h2><p>KernelSU 的安裝方法有以下幾種，各自適用於不同的場景，請視需要選擇：</p><ol><li>使用自訂 Recovery (如 TWRP) 安裝</li><li>使用核心刷新應用程式 (例如 Franco Kernel Manager) 安裝</li><li>使用 KernelSU 提供的 boot.img 透過 Fastboot 安裝</li><li>手動修補 boot.img 並安裝</li></ol><h2 id="install-by-recovery" tabindex="-1">使用自訂 Recovery 安裝 <a class="header-anchor" href="#install-by-recovery" aria-label="Permalink to &quot;使用自訂 Recovery 安裝 {#install-by-recovery}&quot;">​</a></h2><p>先決條件：您的裝置必須有自訂的 Recovery，例如 TWRP；如果沒有或者只有官方 Recovery，請使用其他方法。</p><p>步驟：</p><ol><li>在 KernelSU 的 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">Release 頁面</a> 下載與您手機版本相符的以 AnyKernel3 開頭的 Zip 套件；例如，手機核心版本為 <code>android12-5.10.66</code>，那麼您應該下載 <code>AnyKernel3-android12-5.10.66_yyyy-MM.zip</code> 這個檔案 (其中 <code>yyyy</code> 為年份，<code>MM</code> 為月份)。</li><li>重新開機手機至 TWRP。</li><li>使用 Adb 將 AnyKernel3-*.zip 放置到手機 /sdcard 然後在 TWRP 圖形使用者介面選擇並安裝；或者您也可以直接 <code>adb sideload AnyKernel-*.zip</code> 安裝。</li></ol><p>PS. 這種方法適用於任何狀況下的安裝 (不限於初次安裝或後續更新)，只要您用 TWRP 就可以進行作業。</p><h2 id="install-by-kernel-flasher" tabindex="-1">使用核心刷新應用程式安裝 <a class="header-anchor" href="#install-by-kernel-flasher" aria-label="Permalink to &quot;使用核心刷新應用程式安裝 {#install-by-kernel-flasher}&quot;">​</a></h2><p>先決條件：您的裝置必須已經 Root。例如您已經安裝了 Magisk 並取得 Root 存取權，或者您已經安裝了舊版本的 KernelSU 需升級到其他版本的 KernelSU；如果您的裝置並未 Root，請嘗試其他方法。</p><p>步驟：</p><ol><li>下載 AnyKernel3 的 Zip 檔案；請參閱 <em>使用自訂 Recovery 安裝</em> 章節的内容。</li><li>開啟核心刷新應用程式提供的 AnyKernel3 Zip 檔案進行刷新。</li></ol><p>如果您先前並未使用過核心刷新應用程式，可以嘗試下面幾個方法：</p><ol><li><a href="https://github.com/capntrips/KernelFlasher/releases" target="_blank" rel="noreferrer">Kernel Flasher</a></li><li><a href="https://play.google.com/store/apps/details?id=com.franco.kernel" target="_blank" rel="noreferrer">Franco Kernel Manager</a></li><li><a href="https://play.google.com/store/apps/details?id=flar2.exkernelmanager" target="_blank" rel="noreferrer">Ex Kernel Manager</a></li></ol><p>PS. 這種方法在更新 KernelSU 時比較方便，無需電腦即可完成 (注意備份！)。</p><h2 id="install-by-kernelsu-boot-image" tabindex="-1">使用 KernelSU 提供的 boot.img 安裝 <a class="header-anchor" href="#install-by-kernelsu-boot-image" aria-label="Permalink to &quot;使用 KernelSU 提供的 boot.img 安裝 {#install-by-kernelsu-boot-image}&quot;">​</a></h2><p>這種方法無需您有 TWRP，也無需您的手機有 Root 權限；適用於您初次安裝 KernelSU。</p><h3 id="found-propery-image" tabindex="-1">找到合適的 boot.img <a class="header-anchor" href="#found-propery-image" aria-label="Permalink to &quot;找到合適的 boot.img {#found-propery-image}&quot;">​</a></h3><p>KernelSU 為 GKI 裝置提供了標準 boot.img，您需要將 boot.img 刷新至裝置的 Boot 分割區。</p><p>您可以從 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">GitHub Release</a> 下載 boot.img，請注意，您應該使用正確版本的 boot.img。例如，如果您的裝置顯示核心是 <code>android12-5.10.101</code>，需要下載 <code>android-5.10.101_yyyy-MM.boot-&lt;format&gt;.img</code>.</p><p>其中 <code>&lt;format&gt;</code> 指的是您的官方 boot.img 的核心壓縮格式，請檢查您原有 boot.img 的核心壓縮格式，您應該使用正確的格式，例如 <code>lz4</code>、<code>gz</code>；如果使用不正確的壓縮格式，刷新 Boot 後可能無法開機。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><ol><li>您可以透過 magiskboot 以取得您的原始 Boot 的壓縮格式；當然，您也可以詢問與您相同型號的其他更有經驗的使用者。另外，核心的壓縮格式通常部會出現變更，如果您使用的某個壓縮格式成功開機，後續可以優先嘗試這個格式。</li><li>小米裝置通常 <code>gz</code> 或者 <strong>不壓縮</strong>。</li><li>Pixel 裝置有些特殊，請遵循下方的指示。</li></ol></div><h3 id="flash-boot-image" tabindex="-1">將 boot.img 刷新至裝置 <a class="header-anchor" href="#flash-boot-image" aria-label="Permalink to &quot;將 boot.img 刷新至裝置 {#flash-boot-image}&quot;">​</a></h3><p>使用 <code>adb</code> 連接您的裝置，然後執行 <code>adb reboot bootloader</code> 進入 fastboot 模式，然後使用此命令刷新 KernelSU：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fastboot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flash</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> boot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> boot.img</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>如果您的裝置支援 <code>fastboot boot</code>，可以先使用 <code>fastboot boot boot.img</code> 來先嘗試使用 boot.img 開機進入系統，如果出現意外，重新啟動即可開機。</p></div><h3 id="reboot" tabindex="-1">重新開機 <a class="header-anchor" href="#reboot" aria-label="Permalink to &quot;重新開機 {#reboot}&quot;">​</a></h3><p>刷新完成後，您應該重新啟動您的裝置：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fastboot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reboot</span></span></code></pre></div><h2 id="patch-boot-image" tabindex="-1">手動修補 boot.img <a class="header-anchor" href="#patch-boot-image" aria-label="Permalink to &quot;手動修補 boot.img {#patch-boot-image}&quot;">​</a></h2><p>對於某些裝置來說，其 boot.img 格式並不是很常見，比如 <code>lz4</code>，<code>gz</code> 和未壓縮；最典型的就是 Pixel，它的 boot.img 格式是 <code>lz4_legacy</code> 壓縮，ramdisk 可能是 <code>gz</code> 也可能是 <code>lz4_legacy</code> 壓縮；此時如果您直接刷新 KernelSU 提供的 boot.img，手機可能無法開機；這時，您可以透過手動修補 boot.img 來完成。</p><p>一般有兩種修補方法：</p><ol><li><a href="https://forum.xda-developers.com/t/tool-android-image-kitchen-unpack-repack-kernel-ramdisk-win-android-linux-mac.2073775/" target="_blank" rel="noreferrer">Android-Image-Kitchen</a></li><li><a href="https://github.com/topjohnwu/Magisk/releases" target="_blank" rel="noreferrer">magiskboot</a></li></ol><p>其中，Android-Image-Kitchen 適用於在電腦上作業，magiskboot 需要手機協作。</p><h3 id="patch-preparation" tabindex="-1">準備 <a class="header-anchor" href="#patch-preparation" aria-label="Permalink to &quot;準備 {#patch-preparation}&quot;">​</a></h3><ol><li>取得您手機的原廠 boot.img；您可以聯絡您的裝置製造商，您也可能需要<a href="https://github.com/ssut/payload-dumper-go" target="_blank" rel="noreferrer">payload-dumper-go</a></li><li>下載 KernelSU 提供的與您的裝置 KMI 一致地 AnyKernel3 Zip 檔案 (可參閱 <em>使用自訂 Recovery 安裝</em>)。</li><li>解壓縮 AnyKernel3 Zip 檔案，取得其中的 <code>Image</code> 檔案，此檔案為 KernelSU 的核心檔案。</li></ol><h3 id="using-android-image-kitchen" tabindex="-1">使用 Android-Image-Kitchen <a class="header-anchor" href="#using-android-image-kitchen" aria-label="Permalink to &quot;使用 Android-Image-Kitchen {#using-android-image-kitchen}&quot;">​</a></h3><ol><li>下載 Android-Image-Kitchen 至您的電腦。</li><li>將手機原廠 boot.img 放置於 Android-Image-Kitchen 根目錄。</li><li>在 Android-Image-Kitchen 根目錄執行 <code>./unpackimg.sh boot.img</code>；此命令會將 boot.img 解除封裝，您會得到一些檔案。</li><li>將 <code>split_img</code> 目錄中的 <code>boot.img-kernel</code> 取代為您從 AnyKernel3 解壓縮出來的 <code>Image</code> (注意名稱變更為 boot.img-kernel)。</li><li>在 Android-Image-Kitchecn 根目錄執行 <code>./repackimg.sh</code>；此時您會得到一個 <code>image-new.img</code> 檔案；使用此 boot.img 透過 fastboot 刷新即可 (刷新方法請參閱上一章節)。</li></ol>`,58),s=e("h3",{id:"using",magiskboot:"",tabindex:"-1"},[l("使用 magiskboot "),e("a",{class:"header-anchor",href:"#using","aria-label":'Permalink to "使用 magiskboot {#using magiskboot}"'},"​")],-1),d=o('<ol><li>在 Magisk 的 <a href="https://github.com/topjohnwu/Magisk/releases" target="_blank" rel="noreferrer">Release 頁面</a> 下載最新的 Magisk 安裝套件。</li><li>將 <code>Magisk-*(version).apk</code> 重新命名為 <code>Magisk-*.zip</code> 然後解壓縮。</li><li>將解壓縮後的 <code>Magisk-*/lib/arm64-v8a/libmagiskboot.so</code> 檔案，使用 Adb 推入至手機：<code>adb push Magisk-*/lib/arm64-v8a/libmagiskboot.so /data/local/tmp/magiskboot</code></li><li>使用 Adb 將原廠 boot.img 和 AnyKernel3 中的 Image 推入至手機。</li><li>adb shell 進入 /data/local/tmp/ 目錄，然後賦予先前推入檔案的可執行權限 <code>chmod +x magiskboot</code></li><li>adb shell 進入 /data/local/tmp/ 目錄，執行 <code>./magiskboot unpack boot.img</code> 此時會將 <code>boot.img</code> 解除封裝，得到一個名為 <code>kernel</code> 的檔案，這個檔案是您的原廠核心。</li><li>使用 <code>Image</code> 取代 <code>kernel</code>: <code>mv -f Image kernel</code></li><li>執行 <code>./magiskboot repack boot.img</code> 重新封裝 img，此時您會得到一個 <code>new-boot.img</code> 檔案，透過 Fastboot 將這個檔案刷新至裝置即可。</li></ol><h2 id="other-methods" tabindex="-1">其他替代方法 <a class="header-anchor" href="#other-methods" aria-label="Permalink to &quot;其他替代方法 {#other-methods}&quot;">​</a></h2><p>其實所有這些安裝方法的主旨只有一個，那就是<strong>將原廠核心取代為 KernelSU 提供的核心</strong>；只要能實現這個目的，就可以安裝；比如以下是其他可行的方法：</p><ol><li>首先安裝 Magisk，透過 Magisk 取得 Root 權限後使用核心刷新程式刷新 KernelSU 的 AnyKernel Zip。</li><li>使用某些 PC 上的刷新工具組刷新 KernelSU 提供的核心。</li></ol>',4),c=[n,s,d];function h(p,b,g,m,k,u){return i(),t("div",null,c)}const y=a(r,[["render",h]]);export{K as __pageData,y as default};
