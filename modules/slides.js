class Slides{static createWeightProductsSlide(e){let t=Object.entries(e).sort(([,e],[,t])=>t-e).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,`${t.toFixed(1)} kg`)).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Meistgekauftes Gewicht","Produkte mit dem h\xf6chsten Gesamtgewicht im Jahr (kg)",s)}}static createMostVisitedStoreSlide(e){let t=Object.entries(e).sort(([,e],[,t])=>t-e),s=t.slice(0,3),i=t.length-3,a=`
            <div class="flex-grow space-y-10">
                ${s.map(([e,t],s)=>SlideTemplate.storeCard(s+1,e,t)).join("")}
                ${i>0?`
                    <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                        <div class="inline-flex items-center gap-2 px-6 py-3 bg-orange-50 rounded-full">
                            <svg class="w-5 h-5 text-migros" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                            </svg>
                            <p class="text-lg sm:text-xl text-gray-600">${i} weitere${1===i?"s":""} Gesch\xe4ft${1===i?"":"e"} besucht</p>
                        </div>
                    </div>
                `:""}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Lieblingsgesch\xe4fte","Wo du am h\xe4ufigsten einkaufst",a)}}static createShoppingTimeSlide(e,t,s,i,a,n,r,l){let c=`
            <div class="flex flex-col sm:flex-row justify-center gap-6 sm:gap-24">
                <div class="text-center">
                    <p class="text-base sm:text-lg text-gray-500 mb-1">Fr\xfchester Einkauf</p>
                    <p class="text-3xl sm:text-5xl font-bold text-migros mb-2">${t.split(":").slice(0,2).join(":")}</p>
                    <p class="text-lg sm:text-xl text-gray-600">${n.slice(0,2)}, ${i}</p>
                </div>
                <div class="text-center">
                    <p class="text-base sm:text-lg text-gray-500 mb-1">Sp\xe4tester Einkauf</p>
                    <p class="text-3xl sm:text-5xl font-bold text-migros mb-2">${s.split(":").slice(0,2).join(":")}</p>
                    <p class="text-lg sm:text-xl text-gray-600">${r.slice(0,2)}, ${a}</p>
                </div>
            </div>
            ${SlideTemplate.chartContainer("timeChart")}
            <p class="text-lg sm:text-2xl text-gray-600">Du kaufst am liebsten ${l} ein</p>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufszeiten",null,c),onDisplay(){let t=Object.keys(e).filter(e=>!e.includes("-")).sort((e,t)=>parseInt(e)-parseInt(t)),s=t.map(t=>e[t]),i=document.getElementById("timeChart").getContext("2d");new Chart(i,ChartConfig.getBarChartConfig(t.map(e=>`${e}:00`),s))}}}static createWeekdaySpendingSlide(e){let t=CONFIG.DAYS_ORDER.map(t=>{let s=e[t]||{total:0,visits:0},i=s.visits>0?s.total/s.visits:0;return[t,i]}),s=Math.max(...t.map(([,e])=>e)),i=CONFIG.CHART.maxBarWidth,a=`
            <div class="space-y-8 w-full max-w-2xl mx-auto">
                ${t.map(([e,t],a)=>SlideTemplate.progressBar(e.slice(0,2),0===t?0:t/s*i,ChartConfig.formatCHF(t)+" / Besuch")).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Ausgaben nach Wochentag","Deine Ausgabengewohnheiten nach Wochentag",a)}}static createShoppingDaySlide(e){let t=Object.entries(e).sort((e,t)=>CONFIG.DAYS_ORDER.indexOf(e[0])-CONFIG.DAYS_ORDER.indexOf(t[0])),s=Math.max(...t.map(([,e])=>e)),i=CONFIG.CHART.maxBarWidth,a=t.reduce((e,t)=>t[1]>e[1]?t:e),n=`
            <div class="space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],a)=>SlideTemplate.progressBar(e.slice(0,2),t/s*i,t.toString())).join("")}
            </div>
            <div class="text-center mt-8">
                <p class="text-xl text-gray-600">${{Montag:"Ah, du bist ein Montagseink\xe4ufer! Du startest die Woche mit einem frischen Einkaufswagen.",Dienstag:"Dienstag ist dein Tag! Du umgehst geschickt den Mitte-der-Woche-Ansturm.",Mittwoch:"Mittwochs-Einkaufsmeister! Du erledigst die Dinge, w\xe4hrend andere noch dar\xfcber nachdenken.",Donnerstag:"Donnerstag ist deine Zeit! Du bereitest dich auf das Wochenende vor.",Freitag:"Freitags-Shopper! Du deckst dich f\xfcr Wochenendabenteuer ein.",Samstag:"Du bist ein Wochenend-Krieger! Du nutzt deinen Samstags-Einkauf optimal.",Sonntag:"Sonntag ist dein Tag der Wahl! Bereit f\xfcr die kommende Woche."}[a[0]]}</p>
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufstage","Wann kaufst du am liebsten ein?",n)}}static createMostBoughtProductsSlide(e){let t=Object.entries(e).sort(([,e],[,t])=>t-e).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,`${t.toFixed(0)}x`)).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Top-Eink\xe4ufe","Am h\xe4ufigsten gekaufte Artikel",s)}}static createMonthlySpendingSlide(e,t,s){let{month:i,year:a}=ChartConfig.formatMonthYear(t),n=Object.entries(e).sort(([e],[t])=>e.localeCompare(t)),r=`
            <div class="space-y-2">
                <p class="text-lg sm:text-xl text-gray-600">Monat mit den h\xf6chsten Ausgaben</p>
                <p class="text-2xl sm:text-3xl font-bold text-migros">${i} ${a}</p>
                <p class="text-lg sm:text-xl text-gray-600">${ChartConfig.formatCHF(s)}</p>
            </div>
            ${SlideTemplate.chartContainer("monthlyChart")}
        `;return{content:SlideTemplate.baseSlide("Monatliche Ausgaben",null,r),onDisplay(){let e=n.map(([e])=>{let{shortMonth:t}=ChartConfig.formatMonthYear(e);return t}),t=n.map(([,e])=>e),s=document.getElementById("monthlyChart").getContext("2d");new Chart(s,ChartConfig.getLineChartConfig(e,t))}}}static createSpendingInsightsSlide(e,t,s){let i=Math.abs(t)+s,a=(i/(e+i)*100).toFixed(1),n=`
            <div class="flex-grow space-y-8">
                ${SlideTemplate.statisticBlock("Gesamtausgaben bei Migros",ChartConfig.formatCHF(e))}
                ${SlideTemplate.statisticBlock("Erhaltene regul\xe4re Rabatte",ChartConfig.formatCHF(s))}
                ${SlideTemplate.statisticBlock("Eingel\xf6ste Cumulus-Bons",ChartConfig.formatCHF(Math.abs(t)))}
                ${SlideTemplate.statisticBlock("Gesamte Ersparnisse",`${ChartConfig.formatCHF(i)} (${a}%)`)}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufs\xfcbersicht","Eine Zusammenfassung deiner Ausgaben und Ersparnisse",n)}}static createShoppingTripsSlide(e,t,s){let i=`
            <div class="flex-grow space-y-8">
                ${SlideTemplate.statisticBlock("Durchschnittlicher Einkauf",ChartConfig.formatCHF(e),"Deine typischen Ausgaben pro Besuch")}
                ${SlideTemplate.statisticBlock("G\xfcnstigster Einkauf",ChartConfig.formatCHF(t.total),t.date)}
                ${SlideTemplate.statisticBlock("Gr\xf6sster Einkauf",ChartConfig.formatCHF(s.total),s.date)}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufsstatistiken","Von kleinen Eink\xe4ufen bis zu grossen Besorgungen",i)}}static createExpensiveSinglePurchasesSlide(e){let t=Array.from(e.entries()).filter(([,e])=>1===e.count).sort(([,e],[,t])=>t.price-e.price).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,ChartConfig.formatCHF(t.price))).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Teuerste Einzelk\xe4ufe","Die teuersten Artikel, die du nur einmal gekauft hast",s)}}static createCheapestSinglePurchasesSlide(e){let t=Array.from(e.entries()).filter(([,e])=>1===e.count).sort(([,e],[,t])=>e.price-t.price).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,ChartConfig.formatCHF(t.price))).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("G\xfcnstigste Einzelk\xe4ufe","Die g\xfcnstigsten Artikel, die du nur einmal gekauft hast",s)}}}window.Slides=Slides;
