const saveData = () => {
    const checkboxes = document.querySelectorAll('.target');
    const data = {};
    checkboxes.forEach(cb => {
        if (cb.id) {
            data[cb.id] = cb.checked;
        }
    });
    localStorage.setItem('counterData', JSON.stringify(data));
};

const loadData = () => {
    const saved = localStorage.getItem('counterData');
    if (saved) {
        const data = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.target');
        checkboxes.forEach(cb => {
            if (cb.id && data[cb.id] !== undefined) {
                cb.checked = data[cb.id];
            }
        });
    }
};

const updateDisplays = () => {
    const groups = document.querySelectorAll('.group');
    let totalN = 0;
    let totalM = 0;

    groups.forEach(group => {
        const allBoxes = group.querySelectorAll('.target');
        const checkedBoxes = group.querySelectorAll('.target:checked');
        
        const n = checkedBoxes.length;
        const m = allBoxes.length;

        const fraction = group.querySelector('.fraction');
        const percentage = group.querySelector('.percentage');
        
        if (fraction) fraction.textContent = `${n} / ${m}`;
        if (percentage) {
            const percent = m > 0 ? Math.round((n / m) * 100) : 0;
            percentage.textContent = `${percent}%`;
        }

        totalN += n;
        totalM += m;
    });

    const totalFraction = document.getElementById('total-fraction');
    const totalPercentage = document.getElementById('total-percentage');

    if (totalFraction) totalFraction.textContent = `${totalN} / ${totalM}`;
    if (totalPercentage) {
        const totalPercent = totalM > 0 ? Math.round((totalN / totalM) * 100) : 0;
        totalPercentage.textContent = `${totalPercent}%`;
    }

    saveData();
};

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('target')) {
        updateDisplays();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateDisplays();
});

const resetBtn = document.getElementById('reset-button');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm('データをすべてリセットしますか？')) {
            localStorage.removeItem('counterData');
            location.reload();
        }
    });
}

// 上に戻るボタン
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.querySelectorAll('.group').forEach(group => {
    group.addEventListener('toggle', () => {
        if (!group.open) {
            group.style.display = 'none';
            group.offsetHeight;
            group.style.display = 'block';
        }
    });
});