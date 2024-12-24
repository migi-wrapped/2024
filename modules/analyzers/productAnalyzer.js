class ProductAnalyzer{static analyze(t){let s={productCounts:{},weightProducts:{},storeVisits:{}};return this.processUniqueVisits(t,s.storeVisits),t.forEach(t=>{this.processProductCounts(t,s.productCounts),this.processWeightProducts(t,s.weightProducts)}),s}static processUniqueVisits(t,s){let e=new Set(t.map(t=>`${t.Datum}-${t.Zeit}-${t.Filiale}-${t.Transaktionsnummer}`));return e.forEach(t=>{let[,,e]=t.split("-");s[e]=(s[e]||0)+1}),e}static processProductCounts(t,s){let e=parseFloat(t.Menge);e>0&&(s[t.Artikel]=(s[t.Artikel]||0)+e)}static processWeightProducts(t,s){let e=parseFloat(t.Menge);!isNaN(e)&&e%1!=0&&e>0&&(s[t.Artikel]=(s[t.Artikel]||0)+e)}static getTopProducts(t,s=5){return Object.entries(t).sort(([,t],[,s])=>s-t).slice(0,s)}static getTopWeightProducts(t,s=5){return Object.entries(t).sort(([,t],[,s])=>s-t).slice(0,s)}static getMostVisitedStores(t,s=3){return Object.entries(t).sort(([,t],[,s])=>s-t).slice(0,s)}}window.ProductAnalyzer=ProductAnalyzer;
