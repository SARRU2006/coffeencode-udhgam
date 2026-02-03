export const checkEligibility = (user, scheme) => {
    const reasons = [];

    // Age Check
    if (user.age < scheme.eligibility.minAge) {
        reasons.push(`Minimum age required is ${scheme.eligibility.minAge}. You are ${user.age}.`);
    }
    if (user.age > scheme.eligibility.maxAge) {
        reasons.push(`Maximum age allowed is ${scheme.eligibility.maxAge}. You are ${user.age}.`);
    }

    // Gender Check
    // Note: Some schemes are Female only.
    if (!scheme.eligibility.gender.includes(user.gender)) {
        // Special handling for Stand Up India which allows General Females but not General Males
        // But our data logic is array based.
        // If scheme is "Stand Up India" and user is Male General/OBC -> Ineligible.
        // This simple array check covers most cases:
        reasons.push(`Scheme is for ${scheme.eligibility.gender.join(" or ")}. You are ${user.gender}.`);
    }

    // Income Check
    if (user.income > scheme.eligibility.incomeLimit) {
        reasons.push(`Income limit is ₹${scheme.eligibility.incomeLimit}. Your income is ₹${user.income}.`);
    }

    // Caste Check
    if (!scheme.eligibility.caste.includes(user.caste)) {
        reasons.push(`Scheme is available for ${scheme.eligibility.caste.join(", ")}. You are ${user.caste}.`);
    }

    // Occupation Check
    // Simple check: if scheme has occupations, user occupation must be in list OR user must be "Unemployed" if scheme allows it.
    // We can make this smarter later.
    const schemeOccupations = scheme.eligibility.occupation.map(o => o.toLowerCase());
    const userOcc = user.occupation.toLowerCase();

    // If scheme lists "Student", user must be student.
    // If scheme lists "Farmer", user must be farmer.
    // If scheme lists "Worker", we can be loose.

    const isOccupationMatch = schemeOccupations.includes(userOcc) ||
        schemeOccupations.includes("any") ||
        (schemeOccupations.includes("worker") && ["laborer", "driver", "maid", "worker"].includes(userOcc));

    // Special override for "Student" schemes -> user MUST be student
    if (schemeOccupations.includes("student") && userOcc !== "student") {
        reasons.push(`Must be a Student.`);
    } else if (!isOccupationMatch && !schemeOccupations.includes("any")) {
        // Don't duplicate if caught above
        // Actually simple inclusion check failure:
        if (!schemeOccupations.some(occ => userOcc.includes(occ) || occ.includes(userOcc))) {
            // Fuzzy match attempt
            reasons.push(`Restricted to: ${scheme.eligibility.occupation.join(", ")}.`);
        }
    }

    // Stand Up India Special Logic
    if (scheme.id === "standup-india") {
        // Must be Woman OR (SC/ST)
        const isWoman = user.gender === "Female";
        const isSCST = ["SC", "ST"].includes(user.caste);
        if (!isWoman && !isSCST) {
            reasons.push("Must be either a Woman entrepreneur or an SC/ST entrepreneur.");
        }
    }

    return {
        eligible: reasons.length === 0,
        reasons: reasons
    };
};
