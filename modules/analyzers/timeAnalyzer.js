class TimeAnalyzer{static convertTimeToSeconds(e){let[t,i,a]=e.split(":").map(Number);return 3600*t+60*i+a}static analyze(e){let t={timeOfDay:{},dayOfWeek:{},earliestTime:"23:59:59",latestTime:"00:00:00",earliestDate:"",latestDate:"",earliestDay:"",latestDay:"",peakTime:null};return CONFIG.DAYS_ORDER.forEach(e=>{t.dayOfWeek[e]=0}),e.forEach(e=>{this.updateShoppingTimes(e,t),this.processVisitTime(e,t)}),t.peakTime=this.getPeakShoppingTime(t.timeOfDay),t}static updateShoppingTimes(e,t){let i=this.convertTimeToSeconds(e.Zeit),a=this.convertTimeToSeconds(t.earliestTime),s=this.convertTimeToSeconds(t.latestTime);if(i<a){t.earliestTime=e.Zeit,t.earliestDate=e.Datum;let l=new Date(e.Datum.split(".").reverse().join("-"));t.earliestDay=l.toLocaleDateString("de-DE",{weekday:"long"})}if(i>s){t.latestTime=e.Zeit,t.latestDate=e.Datum;let n=new Date(e.Datum.split(".").reverse().join("-"));t.latestDay=n.toLocaleDateString("de-DE",{weekday:"long"})}}static processVisitTime(e,t){let i=`${e.Datum}-${e.Zeit}-${e.Filiale}-${e.Transaktionsnummer}`;if(!t.timeOfDay[i]){let a=e.Zeit.split(":")[0];t.timeOfDay[a]=(t.timeOfDay[a]||0)+1;let s=new Date(e.Datum.split(".").reverse().join("-")),l=s.toLocaleDateString("de-DE",{weekday:"long"});t.dayOfWeek[l]++,t.timeOfDay[i]=!0}}static getPeakShoppingTime(e){let t=Object.entries(e).filter(([e])=>!e.includes("-")).sort(([,e],[,t])=>t-e),i=parseInt(t[0][0]);return i<12?"morgens":i<17?"nachmittags":"abends"}}window.TimeAnalyzer=TimeAnalyzer;
