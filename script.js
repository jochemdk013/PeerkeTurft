let groupCounts = [0, 0, 0, 0, 0, 0];

function updateTallyDisplay() {
    const tallyGroups = document.getElementById('tallyGroups');
    tallyGroups.innerHTML = '';

    let totalTallies = 0;

    groupCounts.forEach((count, index) => {
        totalTallies += count;
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('tallyGroup');
        
        const img = document.createElement('img');
        img.classList.add('tally');
        img.src = count === 0 ? 'images/tally-0.png' : `images/tally-${count}.png`;
        groupDiv.appendChild(img);

        tallyGroups.appendChild(groupDiv);
    });

    if (groupCounts.every(count => count === 5)) {
        document.getElementById('completeOverlay').style.display = "flex";
    } else {
        document.getElementById('completeOverlay').style.display = "none";
    }

    document.getElementById('moreButton').style.display = totalTallies > 0 ? "block" : "none";
}

function addTally() {
    const index = groupCounts.findIndex(count => count < 5);
    if (index !== -1) {
        groupCounts[index]++;
        updateTallyDisplay();
    }
    document.getElementById('moreOptions').classList.add('hidden');
}

function resetTally() {
    groupCounts.fill(0);
    updateTallyDisplay();
    document.getElementById('completeOverlay').style.display = 'none';
}

function subtractTally() {
    for (let i = groupCounts.length - 1; i >= 0; i--) {
        if (groupCounts[i] > 0) {
            groupCounts[i]--;
            break;
        }
    }
    updateTallyDisplay();
}

function hideMoreOptions() {
    document.getElementById('moreOptions').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    updateTallyDisplay();

    document.getElementById('addTally').addEventListener('click', addTally);

    document.getElementById('moreButton').addEventListener('click', function() {
        var moreOptions = document.getElementById('moreOptions');
        if (moreOptions.classList.contains('hidden')) {
            moreOptions.classList.remove('hidden');
        } else {
            moreOptions.classList.add('hidden');
        }
    });

    document.getElementById('removeTally').addEventListener('click', function() {
        subtractTally();
        hideMoreOptions();
    });

    document.getElementById('resetTally').addEventListener('click', function() {
        resetTally();
        hideMoreOptions();
    });

    document.getElementById('overlayCloseButton').addEventListener('click', function() {
        document.getElementById('completeOverlay').classList.add('hidden');
        resetTally();
    });

    document.getElementById('completeOverlay').classList.remove('hidden');
    document.getElementById('completeOverlay').classList.add('hidden')
});

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
}, false);
