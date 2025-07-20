export function calculateTotal(data) {
    const totals = {};
    let grandTotals = {
        studentParticipation: 0,
        casProjects: 0,
        fundsRaised: 0
    };

    data.forEach(item => {
        const studentParticipationTotal = Object.values(item.StudentParticipation).reduce((sum, value) => sum + value, 0);
        const casProjectsTotal = Object.values(item.CASProjects).reduce((sum, value) => sum + value, 0);
        const fundsRaisedTotal = Object.values(item.FundsRaised).reduce((sum, value) => sum + value, 0);

        totals[item.id] = {
            studentParticipation: studentParticipationTotal,
            casProjects: casProjectsTotal,
            fundsRaised: fundsRaisedTotal,
            color: item.color,
        };

        // Add to grand totals
        grandTotals.studentParticipation += studentParticipationTotal;
        grandTotals.casProjects += casProjectsTotal;
        grandTotals.fundsRaised += fundsRaisedTotal;
    });

    return { totals, grandTotals };
}