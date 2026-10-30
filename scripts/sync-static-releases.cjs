"use strict";
const fs=require("fs"),path=require("path");
const status=JSON.parse(fs.readFileSync("release-status.json","utf8"));
const slugs={"e2Atlas":"e2atlas","AppAtlas":"appatlas","FileAtlas":"fileatlas","CodexVault":"codexvault","BudgetAtlas":"budgetatlas","CalcBoy":"calcboy","Skybreak-Protocol":"skybreak-protocol","UroBilanz":"urobilanz","HealthAtlas":"healthatlas","ThermalAtlas":"thermalatlas","chatgpt-pets":"chatgpt-pets","Shortcuts":"shortcuts","NZBPort":"nzbport"};
function escape(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function group(kind,entry,de){
  const a=entry?.assets||{};if(!a.dmg&&!a.zip&&!a.ipk)return "";
  const title=kind==="final"?(de?"Neueste finale Version":"Latest final release"):(de?"Neueste Beta-Version":"Latest beta release");
  let links="";for(const [ext,label] of [["dmg",de?"macOS DMG herunterladen":"Download macOS DMG"],["zip",de?"macOS ZIP herunterladen":"Download macOS ZIP"],["ipk",de?"IPK herunterladen":"Download IPK"],["sha256",de?"Prüfsummen":"Checksums"]]){
    if(a[ext])links+='<a href="'+escape(a[ext])+'" target="_blank" rel="noreferrer">'+label+' <span>↗</span></a>';
  }
  const note=kind==="beta"?'<p class="release-note">'+(de?"Beta-Versionen können noch Fehler oder unvollständige Funktionen enthalten. Nutzung auf eigenes Risiko.":"Beta versions may still contain errors or incomplete features. Use them at your own risk.")+"</p>":"";
  return '<div class="release-group"><p><strong>'+title+'</strong> · '+escape(entry.release)+'</p><div class="resource-links">'+links+'</div>'+note+'</div>';
}
let count=0;
for(const [repo,slug] of Object.entries(slugs)){
  const data=status[repo];if(!data)continue;
  for(const locale of ["","de/"]){
    const file=locale+"apps/"+slug+"/index.html";if(!fs.existsSync(file))continue;
    let html=fs.readFileSync(file,"utf8"),next=html,de=!!locale;
    // Preserve all layout markup; only update the existing pill and release groups.
    next=next.replace(/(<div class="status-pill">)[\s\S]*?(<\/div>)/,(m,a,b)=>a+escape(data.stage+(data.release?" "+data.release:""))+b);
    const begin=next.indexOf('<div class="release-group">');
    if(begin>=0){
      const end=next.indexOf("</section>",begin);
      if(end<0)throw Error("Missing release section end: "+file);
      const section=next.slice(begin,end);
      if(!/class="release-group"/.test(section))throw Error("Missing release group: "+file);
      next=next.slice(0,begin)+group("final",data.final,de)+group("beta",data.beta,de)+next.slice(end);
    }
    if(next!==html){fs.writeFileSync(file,next);count++;}
  }
}
// Keep homepage badges consistent with the same release-status source.
for(const locale of ["","de/"]){
 const file=locale+"index.html";if(!fs.existsSync(file))continue;
 const original=fs.readFileSync(file,"utf8");
 let html=original;
 for(const [repo,slug] of Object.entries(slugs)){
  const info=status[repo];if(!info)continue;
  const re=new RegExp('(<a href="/Portfolio/apps/'+slug+'/index\\.html" class="app-card"[\\s\\S]*?<span class="release-badge">)[\\s\\S]*?(<\\/span>)');
  const label=info.stage==="Development"?"Development":(info.stage==="Beta"?"Beta ":"")+String(info.release||"").replace(/^v/,"").replace(/-(final|beta.*)$/i,"");
  html=html.replace(re,(all,a,b)=>a+escape(label)+b);
 }
 if(html!==original){fs.writeFileSync(file,html);count++;}
}
console.log("Synchronized "+count+" static pages.");
