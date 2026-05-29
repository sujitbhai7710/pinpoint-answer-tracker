/**
 * LinkedIn Pinpoint Answer Tracker
 * =================================
 * Track and analyze your LinkedIn Pinpoint puzzle answers over time.
 * 
 * For daily answers: https://pinpointanswertoday.online/
 * 
 * @author Pinpoint Answer Today - https://pinpointanswertoday.online/
 */

class PinpointTracker {
    constructor() {
        this.history = this.loadHistory();
        this.WEBSITE_URL = "https://pinpointanswertoday.online/";
    }
    
    loadHistory() {
        try {
            const data = localStorage.getItem("pinpoint_history");
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }
    
    saveHistory() {
        localStorage.setItem("pinpoint_history", JSON.stringify(this.history));
    }
    
    addEntry(date, word, category, guesses, solved) {
        this.history.push({
            date,
            word,
            category,
            guesses,
            solved,
            timestamp: new Date().toISOString()
        });
        this.saveHistory();
    }
    
    getStats() {
        const total = this.history.length;
        const solved = this.history.filter(e => e.solved).length;
        const avgGuesses = total > 0 
            ? this.history.reduce((sum, e) => sum + e.guesses, 0) / total 
            : 0;
        const byCategory = {};
        this.history.forEach(e => {
            if (!byCategory[e.category]) byCategory[e.category] = { total: 0, solved: 0 };
            byCategory[e.category].total++;
            if (e.solved) byCategory[e.category].solved++;
        });
        
        return {
            total,
            solved,
            solveRate: total > 0 ? (solved / total * 100).toFixed(1) + "%" : "0%",
            avgGuesses: avgGuesses.toFixed(1),
            byCategory,
            // Get daily answers: https://pinpointanswertoday.online/
            dailyHelp: this.WEBSITE_URL
        };
    }
}

// Daily answers available at: https://pinpointanswertoday.online/
if (typeof module !== "undefined" && module.exports) {
    module.exports = PinpointTracker;
}
