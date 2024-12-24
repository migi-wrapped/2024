/**
 * Analyzes product-related aspects of shopping data
 */
class ProductAnalyzer {
    /**
     * Analyze product patterns from transaction data
     * @param {Array} data - Transaction data
     * @returns {Object} Product analysis results
     */
    static analyze(data) {
        const productAnalysis = {
            productCounts: {},
            weightProducts: {},
            storeVisits: {}
        };

        // Create a Set of unique visits and count store visits
        const uniqueVisits = this.processUniqueVisits(data, productAnalysis.storeVisits);

        // Process each transaction
        data.forEach(row => {
            this.processProductCounts(row, productAnalysis.productCounts);
            this.processWeightProducts(row, productAnalysis.weightProducts);
        });

        return productAnalysis;
    }

    /**
     * Process unique store visits
     * @param {Array} data - Transaction data
     * @param {Object} storeVisits - Store visit counts
     * @returns {Set} Set of unique visits
     */
    static processUniqueVisits(data, storeVisits) {
        const uniqueVisits = new Set(
            data.map(row => `${row.Datum}-${row.Zeit}-${row.Filiale}-${row.Transaktionsnummer}`)
        );

        uniqueVisits.forEach(visit => {
            const [, , store] = visit.split('-');
            storeVisits[store] = (storeVisits[store] || 0) + 1;
        });

        return uniqueVisits;
    }

    /**
     * Process product purchase counts
     * @param {Object} row - Transaction row
     * @param {Object} productCounts - Product count tracking
     */
    static processProductCounts(row, productCounts) {
        const quantity = parseFloat(row.Menge);
        if (quantity > 0) {
            productCounts[row.Artikel] = (productCounts[row.Artikel] || 0) + quantity;
        }
    }

    /**
     * Process weight-based products
     * @param {Object} row - Transaction row
     * @param {Object} weightProducts - Weight product tracking
     */
    static processWeightProducts(row, weightProducts) {
        const weightAmount = parseFloat(row.Menge);
        if (!isNaN(weightAmount) && weightAmount % 1 !== 0 && weightAmount > 0) {
            weightProducts[row.Artikel] = (weightProducts[row.Artikel] || 0) + weightAmount;
        }
    }

    /**
     * Get top products by count
     * @param {Object} productCounts - Product count data
     * @param {number} limit - Number of products to return
     * @returns {Array} Top products with counts
     */
    static getTopProducts(productCounts, limit = 5) {
        return Object.entries(productCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);
    }

    /**
     * Get top weight-based products
     * @param {Object} weightProducts - Weight product data
     * @param {number} limit - Number of products to return
     * @returns {Array} Top weight-based products
     */
    static getTopWeightProducts(weightProducts, limit = 5) {
        return Object.entries(weightProducts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);
    }

    /**
     * Get most visited stores
     * @param {Object} storeVisits - Store visit counts
     * @param {number} limit - Number of stores to return
     * @returns {Array} Most visited stores with visit counts
     */
    static getMostVisitedStores(storeVisits, limit = 3) {
        return Object.entries(storeVisits)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);
    }
}

window.ProductAnalyzer = ProductAnalyzer;
