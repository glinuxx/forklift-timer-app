import { useState, useEffect } from 'react';

const useStats = (history) => {
    const [stats, setStats] = useState({
        totalCarretas: 0,
        totalHours: 0,
        avgTimePerCarreta: '00:00:00',
        completedToday: 0
    });

    useEffect(() => {
        if (!history || history.length === 0) return;

        const today = new Date().toLocaleDateString();

        // Calcula estatísticas
        const calculateStats = () => {
            const completedToday = history.filter(item => item.date === today).length;

            // Calcula o tempo total em segundos
            const totalSeconds = history.reduce((acc, item) => {
                const [hours, minutes, seconds] = item.totalTime.split(':').map(Number);
                return acc + (hours * 3600 + minutes * 60 + seconds);
            }, 0);

            // Converte para horas com 1 casa decimal
            const totalHours = (totalSeconds / 3600).toFixed(1);

            // Calcula média por carreta
            const avgSeconds = Math.floor(totalSeconds / history.length);
            const avgHours = Math.floor(avgSeconds / 3600);
            const avgMinutes = Math.floor((avgSeconds % 3600) / 60);
            const avgSecs = avgSeconds % 60;
            const avgTimeFormatted = `${avgHours.toString().padStart(2, '0')}:${avgMinutes.toString().padStart(2, '0')}:${avgSecs.toString().padStart(2, '0')}`;

            setStats({
                totalCarretas: history.length,
                totalHours: Number(totalHours),
                avgTimePerCarreta: avgTimeFormatted,
                completedToday
            });
        };

        calculateStats();
    }, [history]);

    return stats;
};

export default useStats;