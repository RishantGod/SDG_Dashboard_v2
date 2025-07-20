export function calculateTotal(data) {
    const totals = {};

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
    });

    return totals;
}