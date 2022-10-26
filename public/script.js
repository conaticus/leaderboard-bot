const leaderboardEl = document.getElementsByClassName("leaderboard").item(0);

const getData = async () => {
    const response = await fetch("/points");
    return await response.json();
};

const generateLeaderboardChild = (user, rank, dataLength) => {
    const parent = document.createElement("div");
    parent.className = "leaderboard-item";

    if (rank !== 1 && rank !== dataLength + 1) {
        const seperator = document.createElement("hr");
        leaderboardEl.appendChild(seperator);
    }

    const rankCircle = document.createElement("div");
    rankCircle.className = "rank-circle";

    switch (rank) {
        case 1:
            rankCircle.style.backgroundColor = "#C08A00";
            break;
        case 2:
            rankCircle.style.backgroundColor = "#5C5C5C";
            break;
        case 3:
            rankCircle.style.backgroundColor = "#5C4427";
            break;
        default:
            rankCircle.style.backgroundColor = "#2B2B2B";
            break;
    }

    const rankCircleText = document.createElement("p");
    rankCircleText.innerText = rank;

    const avatarCircle = document.createElement("img");
    avatarCircle.className = "avatar-circle";
    avatarCircle.src = user.avatarURL;

    const usernameText = document.createElement("p");
    usernameText.className = "username-text";
    usernameText.innerText = user.identifier;

    usernameText.addEventListener("click", () => {
        open(user.threadLink);
    });

    const pointsText = document.createElement("p");
    pointsText.innerText = user.points;
    pointsText.style.width = "100%";
    pointsText.style.textAlign = "right";

    rankCircle.appendChild(rankCircleText);

    parent.appendChild(rankCircle);
    parent.appendChild(avatarCircle);
    parent.appendChild(usernameText);
    parent.appendChild(pointsText);

    leaderboardEl.appendChild(parent);
};

const run = async () => {
    let data = await getData();
    data = data.sort((a, b) => b.points - a.points);

    if (data.length === 0) {
        const messageP = document.createElement("p");
        messageP.innerText = "Currently no projects have been assessed.";
        messageP.style.marginTop = "30px";
        messageP.style.textAlign = "center";
        messageP.style.fontWeight = "normal";

        leaderboardEl.appendChild(messageP);
    } else {
        data.forEach((user, idx) => {
            if (idx === 10) return;
            generateLeaderboardChild(user, idx + 1, data.length);
        });
    }
};

run();
