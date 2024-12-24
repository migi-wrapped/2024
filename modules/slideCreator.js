class SlideCreator{static createSlides(e){return[this.createMostVisitedStoreSlide(e),this.createShoppingDaySlide(e),this.createShoppingTimeSlide(e),this.createShoppingTripsSlide(e),this.createMonthlySpendingSlide(e),this.createWeekdaySpendingSlide(e),this.createSpendingInsightsSlide(e),this.createMostBoughtProductsSlide(e),this.createWeightProductsSlide(e),this.createExpensiveSinglePurchasesSlide(e),this.createCheapestSinglePurchasesSlide(e)]}static createMostVisitedStoreSlide(e){let t=ProductAnalyzer.getMostVisitedStores(e.storeVisits),s=Object.keys(e.storeVisits).length-t.length,i=`
            <div class="flex-grow space-y-10">
                ${t.map(([e,t],s)=>SlideTemplate.storeCard(s+1,e,t)).join("")}
                ${s>0?`
                    <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                        <div class="inline-flex items-center gap-2 px-6 py-3 bg-orange-50 rounded-full">
                            <svg class="w-5 h-5 text-migros" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                            </svg>
                            <p class="text-lg sm:text-xl text-gray-600">${s} weitere${1===s?"s":""} Gesch\xe4ft${1===s?"":"e"} besucht</p>
                        </div>
                    </div>
                `:""}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Lieblingsgesch\xe4fte","Wo du am h\xe4ufigsten einkaufst",i)}}static createShoppingTimeSlide(e){let t=`
            <div class="flex flex-col sm:flex-row justify-center gap-6 sm:gap-24">
                <div class="text-center">
                    <p class="text-base sm:text-lg text-gray-500 mb-1">Fr\xfchester Einkauf</p>
                    <p class="text-3xl sm:text-5xl font-bold text-migros mb-2">${e.earliestTime.split(":").slice(0,2).join(":")}</p>
                    <p class="text-lg sm:text-xl text-gray-600">${e.earliestDay.slice(0,2)}, ${e.earliestDate}</p>
                </div>
                <div class="text-center">
                    <p class="text-base sm:text-lg text-gray-500 mb-1">Sp\xe4tester Einkauf</p>
                    <p class="text-3xl sm:text-5xl font-bold text-migros mb-2">${e.latestTime.split(":").slice(0,2).join(":")}</p>
                    <p class="text-lg sm:text-xl text-gray-600">${e.latestDay.slice(0,2)}, ${e.latestDate}</p>
                </div>
            </div>
            ${SlideTemplate.chartContainer("timeChart")}
            <p class="text-lg sm:text-2xl text-gray-600">Du kaufst am liebsten ${e.peakTime} ein</p>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufszeiten",null,t),onDisplay(){let t=Object.keys(e.timeOfDay).filter(e=>!e.includes("-")).sort((e,t)=>parseInt(e)-parseInt(t)),s=t.map(t=>e.timeOfDay[t]),i=document.getElementById("timeChart").getContext("2d");new Chart(i,ChartConfig.getBarChartConfig(t.map(e=>`${e}:00`),s))}}}static createMonthlySpendingSlide(e){let{month:t,year:s}=ChartConfig.formatMonthYear(e.mostExpensiveMonth),i=Object.entries(e.monthlySpending).sort(([e],[t])=>e.localeCompare(t)),a=`
            <div class="space-y-2">
                <p class="text-lg sm:text-xl text-gray-600">Monat mit den h\xf6chsten Ausgaben</p>
                <p class="text-2xl sm:text-3xl font-bold text-migros">${t} ${s}</p>
                <p class="text-lg sm:text-xl text-gray-600">${ChartConfig.formatCHF(e.highestMonthlySpending)}</p>
            </div>
            ${SlideTemplate.chartContainer("monthlyChart")}
        `;return{content:SlideTemplate.baseSlide("Monatliche Ausgaben",null,a),onDisplay(){let e=i.map(([e])=>{let{shortMonth:t}=ChartConfig.formatMonthYear(e);return t}),t=i.map(([,e])=>e),s=document.getElementById("monthlyChart").getContext("2d");new Chart(s,ChartConfig.getBarChartConfig(e,t))}}}static createWeekdaySpendingSlide(e){let t=CONFIG.DAYS_ORDER.map(t=>{let s=e.daySpending[t]||{total:0,visits:0},i=s.visits>0?s.total/s.visits:0;return[t,i]}),s=Math.max(...t.map(([,e])=>e)),i=`
            <div class="space-y-8 w-full max-w-2xl mx-auto">
                ${t.map(([e,t],i)=>SlideTemplate.progressBar(e.slice(0,2),0===t?0:t/s*220,ChartConfig.formatCHF(t)+" / Besuch")).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Ausgaben nach Wochentag","Deine Ausgabengewohnheiten nach Wochentag",i)}}static createSpendingInsightsSlide(e){let t=Math.abs(e.totalCumulusRabatt)+e.totalRegularRabatt,s=(t/(e.totalSpent+t)*100).toFixed(1),i=`
            <div class="flex-grow space-y-8">
                ${SlideTemplate.statisticBlock("Gesamtausgaben bei Migros",ChartConfig.formatCHF(e.totalSpent))}
                ${SlideTemplate.statisticBlock("Erhaltene regul\xe4re Rabatte",ChartConfig.formatCHF(e.totalRegularRabatt))}
                ${SlideTemplate.statisticBlock("Eingel\xf6ste Cumulus-Bons",ChartConfig.formatCHF(Math.abs(e.totalCumulusRabatt)))}
                ${SlideTemplate.statisticBlock("Gesamte Ersparnisse",`${ChartConfig.formatCHF(t)} (${s}%)`)}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufs\xfcbersicht","Eine Zusammenfassung deiner Ausgaben und Ersparnisse",i)}}static createShoppingTripsSlide(e){let t=`
            <div class="flex-grow space-y-8">
                ${SlideTemplate.statisticBlock("Durchschnittlicher Einkauf",ChartConfig.formatCHF(e.avgSpentPerVisit),"Deine typischen Ausgaben pro Besuch")}
                ${SlideTemplate.statisticBlock("G\xfcnstigster Einkauf",ChartConfig.formatCHF(e.cheapestTrip.total),e.cheapestTrip.date)}
                ${SlideTemplate.statisticBlock("Gr\xf6sster Einkauf",ChartConfig.formatCHF(e.mostExpensiveTrip.total),e.mostExpensiveTrip.date)}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufsstatistiken","Von kleinen Eink\xe4ufen bis zu grossen Besorgungen",t)}}static createMostBoughtProductsSlide(e){let t=ProductAnalyzer.getTopProducts(e.productCounts),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,`${t.toFixed(0)}x`)).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Top-Eink\xe4ufe","Am h\xe4ufigsten gekaufte Artikel",s)}}static createWeightProductsSlide(e){let t=ProductAnalyzer.getTopWeightProducts(e.weightProducts),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,`${t.toFixed(1)} kg`)).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Meistgekauftes Gewicht","Produkte mit dem h\xf6chsten Gesamtgewicht im Jahr (kg)",s)}}static createExpensiveSinglePurchasesSlide(e){let t=Array.from(e.singlePurchaseItems.entries()).filter(([,e])=>1===e.count).sort(([,e],[,t])=>t.price-e.price).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,ChartConfig.formatCHF(t.price))).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("Teuerste Einzelk\xe4ufe","Die teuersten Artikel, die du nur einmal gekauft hast",s)}}static createCheapestSinglePurchasesSlide(e){let t=Array.from(e.singlePurchaseItems.entries()).filter(([,e])=>1===e.count).sort(([,e],[,t])=>e.price-t.price).slice(0,5),s=`
            <div class="flex-grow space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],s)=>SlideTemplate.rankedListItem(s+1,e,ChartConfig.formatCHF(t.price))).join("")}
            </div>
        `;return{content:SlideTemplate.baseSlide("G\xfcnstigste Einzelk\xe4ufe","Die g\xfcnstigsten Artikel, die du nur einmal gekauft hast",s)}}static createShoppingDaySlide(e){let t=Object.entries(e.dayOfWeek).sort((e,t)=>CONFIG.DAYS_ORDER.indexOf(e[0])-CONFIG.DAYS_ORDER.indexOf(t[0])),s=Math.max(...t.map(([,e])=>e)),i=t.reduce((e,t)=>t[1]>e[1]?t:e),a=`
            <div class="space-y-8 w-full max-w-xl mx-auto">
                ${t.map(([e,t],i)=>SlideTemplate.progressBar(e.slice(0,2),t/s*220,t.toString())).join("")}
            </div>
            <div class="text-center mt-8">
                <p class="text-xl text-gray-600">${{Montag:"Ah, du bist ein Montagseink\xe4ufer! Du startest die Woche mit einem frischen Einkaufswagen.",Dienstag:"Dienstag ist dein Tag! Du umgehst geschickt den Mitte-der-Woche-Ansturm.",Mittwoch:"Mittwochs-Einkaufsmeister! Du erledigst die Dinge, w\xe4hrend andere noch dar\xfcber nachdenken.",Donnerstag:"Donnerstag ist deine Zeit! Du bereitest dich auf das Wochenende vor.",Freitag:"Freitags-Shopper! Du deckst dich f\xfcr Wochenendabenteuer ein.",Samstag:"Du bist ein Wochenend-Krieger! Du nutzt deinen Samstags-Einkauf optimal.",Sonntag:"Sonntag ist dein Tag der Wahl! Bereit f\xfcr die kommende Woche."}[i[0]]}</p>
            </div>
        `;return{content:SlideTemplate.baseSlide("Deine Einkaufstage","Wann kaufst du am liebsten ein?",a)}}}window.SlideCreator=SlideCreator;
