import{_ as e,o as i,c as t,R as o}from"./chunks/framework.EUU6lLMq.js";const p=JSON.parse('{"title":"Difference with Magisk","description":"","frontmatter":{},"headers":[],"relativePath":"guide/difference-with-magisk.md","filePath":"guide/difference-with-magisk.md"}'),a={name:"guide/difference-with-magisk.md"},s=o('<h1 id="difference-with-magisk" tabindex="-1">Difference with Magisk <a class="header-anchor" href="#difference-with-magisk" aria-label="Permalink to &quot;Difference with Magisk&quot;">​</a></h1><p>Although there are many similarities between KernelSU modules and Magisk modules, there are inevitably some differences due to their completely different implementation mechanisms. If you want your module to run on both Magisk and KernelSU, you must understand these differences.</p><h2 id="similarities" tabindex="-1">Similarities <a class="header-anchor" href="#similarities" aria-label="Permalink to &quot;Similarities&quot;">​</a></h2><ul><li>Module file format: both use zip format to organize modules, and the format of modules is almost the same</li><li>Module installation directory: both located in <code>/data/adb/modules</code></li><li>Systemless: both support modifying /system in a systemless way through modules</li><li>post-fs-data.sh: the execution time and semantics are exactly the same</li><li>service.sh: the execution time and semantics are exactly the same</li><li>system.prop: completely the same</li><li>sepolicy.rule: completely the same</li><li>BusyBox: scripts are run in BusyBox with &quot;standalone mode&quot; enabled in both cases</li></ul><h2 id="differences" tabindex="-1">Differences <a class="header-anchor" href="#differences" aria-label="Permalink to &quot;Differences&quot;">​</a></h2><p>Before understanding the differences, you need to know how to differentiate whether your module is running in KernelSU or Magisk. You can use the environment variable <code>KSU</code> to differentiate it in all places where you can run module scripts (<code>customize.sh</code>, <code>post-fs-data.sh</code>, <code>service.sh</code>). In KernelSU, this environment variable will be set to <code>true</code>.</p><p>Here are some differences:</p><ul><li>KernelSU modules cannot be installed in Recovery mode.</li><li>KernelSU modules do not have built-in support for Zygisk (but you can use Zygisk modules through <a href="https://github.com/Dr-TSNG/ZygiskNext" target="_blank" rel="noreferrer">ZygiskNext</a>.</li><li>The method for replacing or deleting files in KernelSU modules is completely different from Magisk. KernelSU does not support the <code>.replace</code> method. Instead, you need to create a same-named file with <code>mknod filename c 0 0</code> to delete the corresponding file.</li><li>The directories for BusyBox are different. The built-in BusyBox in KernelSU is located in <code>/data/adb/ksu/bin/busybox</code>, while in Magisk it is in <code>/data/adb/magisk/busybox</code>. <strong>Note that this is an internal behavior of KernelSU and may change in the future!</strong></li><li>KernelSU does not support <code>.replace</code> files; however, KernelSU supports the <code>REMOVE</code> and <code>REPLACE</code> variable to remove or replace files and folders.</li><li>KernelSU adds <code>boot-completed</code> stage to run some scripts on boot completed.</li><li>KernelSU adds <code>post-mount</code> stage to run some scripts after mounting overlayfs</li></ul>',8),r=[s];function n(l,d,c,h,m,u){return i(),t("div",null,r)}const g=e(a,[["render",n]]);export{p as __pageData,g as default};
