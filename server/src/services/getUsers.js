const User = require("../models/User");

module.exports = async (min, max, search) => {
    const minRef = parseInt(min);
    const maxRef = parseInt(max);

    const result = await User.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "id",
                foreignField: "referredBy",
                pipeline: [
                    {
                        $match: {
                            joinedToChannel: true
                        }
                    }
                ],
                as: "referrals"
            }
        },
        {
            $addFields: {
                referralsCount: {
                    $cond: [
                        { $isNumber: "$refCount" },
                        "$refCount",
                        { $size: "$referrals" }
                    ]
                }
            }
        },
        {
            $match: {
                ...(search && {
                    name: { $regex: search, $options: "i" }
                }),
                ...((minRef || maxRef) && {
                    referralsCount: {
                        ...(minRef && { $gte: minRef }),
                        ...(maxRef && { $lte: maxRef }),
                    }
                }),
                $and: [
                    { name: { $ne: null } },
                    { phoneNumber: { $ne: null } },
                ]
            }
        },
        {
            $sort: { referralsCount: -1 }
        },
        {
            $project: {
                referrals: 0,
                role: 0,
                refCount: 0,
                __v: 0,
            }
        }
    ]);

    // Prepare photo urls
    result.forEach(user => {
        if (user.photo) {
            user.photo = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${user.photo}`;
        };
    });

    return result;
};