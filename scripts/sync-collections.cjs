/* Synchronizes folder-backed collections and generates localized static detail pages.
 * Uses only public GitHub repository content; GitHub Actions supplies GH_TOKEN.
 */
const fs=require("fs"),path=require("path");
const base="https://api.github.com/repos/Schrotty74/";
const configs=[
 {repo:"chatgpt-pets",slug:"chatgpt-pets",root:"",kind:"pets"},
 {repo:"Enigma-Plugins",slug:"enigma-plugins",root:"plugins",kind:"plugins"},
 {repo:"LG-G5-Apps",slug:"lg-g5-apps",root:"apps",kind:"apps"}
];
function safe(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
const nice=s=>s==="MischiefDuo"?"Whiskers & Squeak":s==="FinderGuy"?"Finder Guy":s==="BoxSystemInfo"?"Box Systeminfo":s==="system-monitor"?"G5 System Monitor":s.replace(/[-_]/g," ");
const slug=s=>s.toLowerCase().replace(/[^a-z0-9-]/g,"-");
async function get(url){const r=await fetch(url,{headers:{Accept:"application/vnd.github+json",...(process.env.GH_TOKEN?{Authorization:"Bearer "+process.env.GH_TOKEN}:{})}});if(r.status===404)return null;if(!r.ok)throw new Error(url+": "+r.status);return r.json();}
async function read(repo,filename){const r=await get(base+repo+"/contents/"+filename);return r?.content?Buffer.from(r.content,"base64").toString("utf8"):"";}
function description(md){return md.split(/\r?\n/).map(x=>x.trim()).find(x=>x.length>40&&!/^(#|\||>|\[|!|[-*] |\d+\.|<|\x60)/.test(x))?.replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/[\x60*_]/g,"")||"";}
function bullets(md){return md.split(/\r?\n/).filter(x=>/^[-*] /.test(x)).map(x=>x.replace(/^[-*] /,"").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/[\x60*_]/g,"")).filter(x=>x.length>8).slice(0,14);}
function template(cfg,item,de,readme,altReadme){
 const pre=de?"de/":"",lab=de?"Alle Projekte":"All projects",heading=de?"Projektbeschreibung":"Project description",technical=de?"Eigenschaften und Funktionen":"Features and details";
 const text=description(readme)||description(altReadme)||(de?"Projektdateien und Installationshinweise im Repository.":"Project files and installation instructions in the repository.");
 const points=bullets(readme).length?bullets(readme):bullets(altReadme);
 const url="https://github.com/Schrotty74/"+cfg.repo+"/tree/main/"+item.folder;
 const file=item.download?'<a href="'+safe(item.download)+'" target="_blank" rel="noreferrer">'+(de?"Download IPK":"Download IPK")+(item.version?" v"+safe(item.version):"")+' <span>↗</span></a>':"";
 const photo=item.preview?'<img src="'+safe(item.preview)+'" alt="'+safe(item.name)+'" loading="eager"/>':"";
 const status=item.version?'<p class="detail-note">'+(de?"Release: ":"Release: ")+safe(item.version)+'</p>':"";
 const rows=points.map((x,i)=>'<div><b>'+String(i+1).padStart(2,"0")+'</b><span>'+safe(x)+'</span></div>').join("");
 const back="/Portfolio/"+pre+"apps/"+cfg.slug+"/";
 return '<!doctype html><html lang="'+(de?"de":"en")+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+safe(item.name)+' | Schrotty74 Apps</title><meta name="description" content="'+safe(text.slice(0,160))+'"><link rel="stylesheet" href="/Portfolio/assets/styles.css?v=47"><link rel="stylesheet" href="/Portfolio/assets/dark-theme.css?v=43"><link rel="stylesheet" href="/Portfolio/assets/light-theme.css?v=43"><link rel="stylesheet" href="/Portfolio/assets/color-theme.css?v=43"><script>try{document.documentElement.dataset.theme=localStorage.getItem("portfolio-theme")||"dark"}catch{}</script></head><body><main class="detail-shell" lang="'+(de?"de":"en")+'"><div class="ambient-orb orb-one"></div><div class="ambient-orb orb-two"></div><a class="skip-link" href="#main-content">'+(de?"Zum Hauptinhalt":"Skip to content")+'</a><nav class="topbar"><a class="wordmark" href="/Portfolio/'+(de?"de":"")+'"><span>✦</span> Schrotty74 Apps</a><div class="nav-actions"><a class="nav-link" href="'+back+'">'+lab+'</a><span class="language-switch"><a href="/Portfolio/apps/'+cfg.slug+'/items/'+item.slug+'/"'+(de?"":' class="active"')+'>EN</a><a href="/Portfolio/de/apps/'+cfg.slug+'/items/'+item.slug+'/"'+(de?' class="active"':"")+'>DE</a></span><div class="theme-switcher"><button>Dunkel</button><button>Hell</button><button>Bunt</button></div></div></nav><article class="detail-page" id="main-content" tabindex="-1"><a class="back" href="'+back+'">← '+lab+'</a><div class="detail-grid"><section><p class="eyebrow">'+safe(cfg.repo)+'</p><h1>'+safe(item.name)+'</h1><p class="lead">'+safe(text.slice(0,300))+'</p><div class="action-row"><a href="'+safe(url)+'" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></section><aside class="detail-art" aria-label="'+safe(item.name)+'">'+photo+'<div class="status-pill">'+(item.version?safe(item.version):de?"Projekt":"Project")+'</div></aside></div><section class="detail-section"><p class="eyebrow">'+heading+'</p><p>'+safe(text)+'</p></section><section class="ai-detail"><p class="eyebrow">'+(de?"KI-gestützte Entwicklung":"AI-assisted development")+'</p><p>'+ (de?"Schrotty74 entwickelt diese Projekte mit KI-Unterstützung. Prüfung und Verantwortung liegen bei Schrotty74.":"Schrotty74 develops these projects with AI assistance and retains final review and responsibility.") +'</p></section>'+(rows?'<section class="feature-section"><p class="eyebrow">'+technical+'</p><div class="feature-list expanded">'+rows+'</div></section>':"")+'<section class="resource-section"><p class="eyebrow">'+(de?"Quellcode und Downloads":"Source and downloads")+'</p><div class="resource-links"><a href="'+safe(url)+'" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>'+file+(item.releaseUrl?'<a href="'+safe(item.releaseUrl)+'" target="_blank" rel="noreferrer">Release <span>↗</span></a>':"")+'</div></section>'+status+'</article><footer class="site-footer"><span>© 2026 Schrotty74</span></footer></main><script src="/Portfolio/assets/static-app.js?v=47"></script></body></html>';
}
function put(filename,content){fs.mkdirSync(path.dirname(filename),{recursive:true});if(!fs.existsSync(filename)||fs.readFileSync(filename,"utf8")!==content)fs.writeFileSync(filename,content);}
(async()=>{
 for(const cfg of configs){
  const [tree,releases]=await Promise.all([get(base+cfg.repo+"/git/trees/main?recursive=1"),get(base+cfg.repo+"/releases?per_page=100")]);
  if(!tree||tree.truncated)throw Error("Missing or truncated tree: "+cfg.repo);
  const dirs=tree.tree.filter(x=>x.type==="tree"&&(cfg.root?x.path.startsWith(cfg.root+"/")&&x.path.slice(cfg.root.length+1).indexOf("/")===-1:!x.path.includes("/")));
  const items=[];
  for(const dir of dirs){
   const raw=dir.path.split("/").pop(),id=slug(raw),name=nice(raw);
   const prefix=raw.toLowerCase().replace(/[^a-z0-9]/g,"");
   const matching=(releases||[]).filter(r=>!r.draft&&r.tag_name.toLowerCase().replace(/[^a-z0-9]/g,"").startsWith(prefix)).sort((a,b)=>Date.parse(b.published_at||b.created_at)-Date.parse(a.published_at||a.created_at));
   const rel=matching[0],asset=rel?.assets?.find(a=>/\.(ipk|zip|dmg|webp|png)$/i.test(a.name));
   const ipk=tree.tree.filter(x=>x.type==="blob"&&x.path.startsWith(dir.path+"/")&&/\.ipk$/i.test(x.path)).sort((a,b)=>b.path.localeCompare(a.path))[0];
   const sprite=tree.tree.find(x=>x.type==="blob"&&x.path.startsWith(dir.path+"/")&&/spritesheet.*\.(png|webp)$/i.test(x.path));
   const preview=cfg.kind==="pets"?"https://raw.githubusercontent.com/Schrotty74/"+cfg.repo+"/main/"+dir.path+"/preview-transparent.png":cfg.kind==="plugins"?"https://raw.githubusercontent.com/Schrotty74/"+cfg.repo+"/main/"+dir.path+"/src/usr/lib/enigma2/python/Plugins/Extensions/"+raw+"/icon.png":cfg.kind==="apps"?"https://raw.githubusercontent.com/Schrotty74/"+cfg.repo+"/main/"+dir.path+"/app/icon.png":null;
   const versionFromIpk=ipk?.path.match(/_(\d+\.\d+(?:\.\d+)*(?:[-+.][A-Za-z0-9.-]+)?)_/i)?.[1]||null;
   const detectedVersion=rel?.tag_name||versionFromIpk;
   const item={name,slug:id,folder:dir.path,url:"https://github.com/Schrotty74/"+cfg.repo+"/tree/main/"+dir.path,version:detectedVersion,releaseUrl:rel?.html_url||null,download:asset?.browser_download_url|| (ipk?"https://raw.githubusercontent.com/Schrotty74/"+cfg.repo+"/main/"+ipk.path:null)|| (sprite?"https://raw.githubusercontent.com/Schrotty74/"+cfg.repo+"/main/"+sprite.path:null),preview};
   items.push(item);
   const [english,german]=await Promise.all([read(cfg.repo,dir.path+"/README.en.md"),read(cfg.repo,dir.path+"/README.de.md")]);
   const standard=await read(cfg.repo,dir.path+"/README.md");
   const en=english||standard, de=german||standard;
   for(const language of ["en","de"]){const prefix=language==="de"?"de/":"";put(prefix+"apps/"+cfg.slug+"/items/"+id+"/index.html",template(cfg,item,language==="de",language==="de"?de:en,standard));}
  }
  items.sort((a,b)=>a.name.localeCompare(b.name));
  put("collections/"+cfg.slug+".json",JSON.stringify({repository:cfg.repo,items},null,2)+"\n");
 }
})().catch(e=>{console.error(e);process.exit(1)});
