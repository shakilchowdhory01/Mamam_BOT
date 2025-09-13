const fs = require("fs");
const path = require("path");

// 🔹 লক ডেটা ফাইল
const lockFilePath = path.join(__dirname, "grouplock.json");

// 🔹 লক ডেটা লোড/সেভ
function loadLockData() {
    if (!fs.existsSync(lockFilePath)) fs.writeFileSync(lockFilePath, "{}");
    return JSON.parse(fs.readFileSync(lockFilePath, "utf-8"));
}

function saveLockData(data) {
    fs.writeFileSync(lockFilePath, JSON.stringify(data, null, 2));
}

// 🔹 নির্দিষ্ট এডমিন UID তালিকা
const ADMIN_UIDS = ["61578993171251"]; // এখানে নিজের UID বসাও

module.exports.config = {
    name: "grouplock",
    version: "3.0",
    hasPermssion: 2,
    credits: "Asadul & ChatGPT",
    description: "Powerful group lock system",
    commandCategory: "admin",
    usages: "[on/off/status]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args, Threads }) => {
    const senderID = event.senderID;
    const threadID = event.threadID;
    const data = loadLockData();

    // ❌ এডমিন চেক
    if (!ADMIN_UIDS.includes(senderID)) return api.sendMessage("❌ তুমি এডমিন না।", threadID);

    const command = args[0] ? args[0].toLowerCase() : "";
    if (command === "on") {
        data[threadID] = true;
        saveLockData(data);
        return api.sendMessage("🔒 গ্রুপ লক করা হয়েছে!", threadID);
    } else if (command === "off") {
        data[threadID] = false;
        saveLockData(data);
        return api.sendMessage("🔓 গ্রুপ আনলক করা হয়েছে!", threadID);
    } else if (command === "status") {
        const status = data[threadID] ? "🔒 লক" : "🔓 আনলক";
        return api.sendMessage(`গ্রুপের বর্তমান স্ট্যাটাস: ${status}`, threadID);
    } else {
        return api.sendMessage("❌ কমান্ড: on/off/status", threadID);
    }
};

// 🔹 মেসেজ ব্লকিং হ্যান্ডলার
module.exports.handleEvent = async ({ event, api }) => {
    const threadID = event.threadID;
    const senderID = event.senderID;
    const messageID = event.messageID;

    // ❌ এডমিনের মেসেজে কিছু হবে না
    if (ADMIN_UIDS.includes(senderID)) return;

    const data = loadLockData();

    if (data[threadID]) {
        try {
            // মেসেজ ডিলিট
            await api.unsendMessage(messageID);
            // সতর্কবার্তা
            return api.sendMessage("❌ এই গ্রুপ লকড আছে! শুধুমাত্র এডমিন মেসেজ পাঠাতে পারে।", threadID);
        } catch (e) {
            console.log("Error unsending message:", e);
        }
    }
};

// 🔹 বট চালু হওয়ার সাথে সাথে সমস্ত গ্রুপে লক একটিভ
module.exports.onStart = async ({ api, Threads }) => {
    const data = loadLockData();
    const threadList = await Threads.getAll(); // সব গ্রুপ লিস্ট
    for (const thread of threadList) {
        if (!(thread.threadID in data)) data[thread.threadID] = true;
    }
    saveLockData(data);
    console.log("✅ সব গ্রুপে লক একটিভ করা হয়েছে।");
};
