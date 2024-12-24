class SlideTemplate{static baseSlide(t,s,e){return`
            <div class="h-[calc(100vh-4rem)] bg-white p-8 flex flex-col overflow-y-auto">
                <div class="text-center mb-8">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">${t}</h2>
                    ${s?`<p class="text-xl sm:text-2xl text-gray-600">${s}</p>`:""}
                </div>
                ${e}
            </div>
            ${this.animations}
        `}static rankedListItem(t,s,e){return`
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-6 min-w-0">
                    <span class="text-migros font-bold text-2xl sm:text-3xl shrink-0">#${t}</span>
                    <span class="text-xl sm:text-2xl text-gray-600 truncate">${s}</span>
                </div>
                <span class="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap shrink-0">${e}</span>
            </div>
        `}static storeCard(t,s,e){return`
            <div class="transform hover:scale-[1.02] transition-all duration-300 ease-out">
                <div class="relative bg-gradient-to-r from-orange-50 to-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="absolute -left-3 -top-3">
                        <div class="w-12 h-12 bg-migros rounded-lg shadow-lg flex items-center justify-center transform -rotate-6">
                            <span class="text-white text-xl sm:text-2xl font-bold">#${t}</span>
                        </div>
                    </div>
                    <div class="ml-8 space-y-3 min-w-0">
                        <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words pr-4 max-w-full">${s}</h3>
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-migros" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            <span class="text-lg sm:text-xl text-gray-600">${e} Besuche</span>
                        </div>
                    </div>
                </div>
            </div>
        `}static chartContainer(t){return`
            <div class="relative w-full max-w-[600px] h-[250px] sm:h-[300px] mx-auto mb-6">
                <canvas id="${t}"></canvas>
            </div>
        `}static statisticBlock(t,s,e=""){return`
            <div class="space-y-2">
                <p class="text-2xl sm:text-3xl font-bold text-gray-800">${t}</p>
                <p class="text-3xl sm:text-4xl font-bold ${"Gesamte Ersparnisse"===t?"text-green-600":"text-migros"}">${s}</p>
                ${e?`<p class="text-lg sm:text-2xl text-gray-600">${e}</p>`:""}
            </div>
        `}static progressBar(t,s,e){return`
            <div class="relative flex items-center gap-4 group">
                <div class="w-12">
                    <span class="text-lg font-medium text-gray-700 group-hover:text-migros transition-colors duration-300">${t}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="relative">
                        <div class="absolute -inset-y-2 -inset-x-3 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div class="relative flex items-center">
                            ${s>0?`
                                <div class="h-8 rounded-md overflow-hidden relative" style="width: ${s}px;">
                                    <div class="h-full w-full bg-gradient-to-r from-[${ChartConfig.colors.primary}] to-[${ChartConfig.colors.secondary}] transform origin-left transition-transform duration-300 hover:scale-x-[1.01]" 
                                         style="animation: growWidth 2s ease-out forwards; width: 0">
                                    </div>
                                </div>
                            `:""}
                            <div class="ml-3">
                                <span class="text-lg font-bold text-gray-800 whitespace-nowrap">${e}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}static get animations(){return`
            <style>
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes growWidth {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `}}window.SlideTemplate=SlideTemplate;
