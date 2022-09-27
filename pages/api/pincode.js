// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pinCodes = {
        "75800":["karachi", "Sindh"],
        "85800":["Lahore", "Punjab"],
        "95800":["Quetta", "Balochistan"],
        "65800":["Peshawar", "KPK"]
    }
    res.status(200).json(pinCodes)
}