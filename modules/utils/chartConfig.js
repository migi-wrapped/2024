class ChartConfig{static get colors(){return CONFIG.CHART.colors}static getBaseOptions(){return{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{color:"#1f2937",font:{size:14}},grid:{color:"rgba(0, 0, 0, 0.1)"}},x:{ticks:{color:"#1f2937",font:{size:14}},grid:{display:!1}}},plugins:{legend:{display:!1}}}}static getBarChartConfig(t,s){return{type:"bar",data:{labels:t,datasets:[{label:"Monatliche Ausgaben",data:s,backgroundColor:this.colors.primary,borderRadius:8}]},options:{...this.getBaseOptions(),scales:{...this.getBaseOptions().scales,y:{...this.getBaseOptions().scales.y,ticks:{...this.getBaseOptions().scales.y.ticks,callback:t=>`CHF ${t.toFixed(0)}`}}}}}}static getLineChartConfig(t,s,o=!0){return{type:"line",data:{labels:t,datasets:[{label:"Monatliche Ausgaben",data:s,borderColor:this.colors.primary,backgroundColor:o?this.colors.background:void 0,borderWidth:2,fill:o,tension:.4}]},options:{...this.getBaseOptions(),scales:{...this.getBaseOptions().scales,y:{...this.getBaseOptions().scales.y,ticks:{...this.getBaseOptions().scales.y.ticks,callback:t=>`CHF ${t.toFixed(0)}`}}}}}}static formatCHF(t,s=2){return`CHF ${t.toFixed(s)}`}static formatMonthYear(t){let[s,o]=t.split("-"),e=new Date(s,parseInt(o)-1);return{month:e.toLocaleString("default",{month:"long"}),shortMonth:e.toLocaleString("default",{month:"short"}),year:s}}}window.ChartConfig=ChartConfig;
