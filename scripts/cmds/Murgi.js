// murgii.js — GoatBot V2 version (Only Bot Admin)
module.exports = {
  config: {
    name: "murgi",
    version: "1.0.5",
    author: "nayan",
    countDown: 5,
    role: 2, // ✅ শুধু Bot Admin
    shortDescription: "Bad word spam with mention",
    longDescription: "",
    category: "18+"
  },

  onStart: async function ({ api, event }) {
    // ✅ Permission check: শুধু Bot Admin
    if (event.role !== 2) {
      return api.sendMessage(
        "❌ এই কমান্ড শুধু Bot Admin এর জন্য",
        event.threadID,
        event.messageID
      );
    }

    const mention = Object.keys(event.mentions || {})[0];
    if (!mention) {
      return api.sendMessage("👉 যাকে চুদে লাল করতে চাও তাকে mention করো ", event.threadID);
    }

    const name = event.mentions[mention];
    const arraytag = [{ id: mention, tag: name }];
    const send = (msg) => api.sendMessage(msg, event.threadID);

    // Bad word messages list
    const messages = [
      "চুদা লো",
      "খাংকির পোলা তর মারে চুদি 👉👌 " + name,
      "খাংকির পোলা তর কচি বোন রে চুদি 😍 " + name,
      "মাদারচোদ তর আম্মু পম পম 🐰 " + name,
      "খাংকির পোলা তর কচি ভুদায় কামর দিমু 💔 " + name,
      "depression থেকেও তর মাইরে চু*** দি 🤬 " + name,
      "তর আম্মু রে আচার এর লোভ দেখিয়ে চুদি 🤬 " + name,
      "বান্দির পোলা তর কচি বোনের ভুদায় দন ডুকামু 🤟 " + name,
      "বান্দি মাগির পোলা তর আম্মু রে চুদি 🤝 " + name,
      "উফফফ খাদ্দামা মাগির পোলা তর আম্মুর ভুদায় মাল আউট 💉 " + name,
      "অনলাইনে গালি বাজ হয়ে গেছস, চুদা দিমু লাইফ টাইম মনে রাখবি 🐸👉👌" + name,
      "বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো ✋ " + name,
      "হাই মাদারচোদ তর জাতের আম্মু রে চুদি " + name,
      "~ চুদা কি আরো খাবি মাগির পোলা 🤖",
      "খাংকির পোলা 👉👌 " + name,
      "মাদারচোদ👉👌" + name,
      "ব্যাস্যার পোলা 🐰 " + name,
      "ব্যাশ্যা মাগির পোলা 💔 " + name,
      "পতিতা মাগির পোলা " + name,
      "তর মারে চুদি " + name,
      "নাট বল্টু মাগির পোলা 🤟 " + name,
      "তর বোন রে পায়জামা খুলে চুদি 🤣 " + name,
      "উম্মম্মা তর বোন এর কচি ভুদায় 💉 " + name,
      "DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম " + name,
      "কামলা মাগির পোলা ✋ " + name,
      "বাস্ট্রাড এর বাচ্চা বস্তির পোলা " + name,
      "~ আমার জারজ সন্তান 🤖",
      "Welcome মাগির পোলা 🥰 " + name,
      "তর কচি বোন এর পম পম 😍 " + name,
      "ব্যাস্যার পোলা কথা শুন তর আম্মু রে গামছা পেচিয়ে চুদি 🐰 " + name,
      "রাহাদ তোরে ডগি স্টাইলে করবো" + name,
      "২০ টাকার লোভ দেখিয়ে রাহাদ তোর বোনকে চুদছে 🤣" + name,
      "বস্তির ছেলে অনলাইনের কিং 😭🤣" + name,
      "টুকাই মাগির পোলা 🤟 " + name,
      "তর আম্মু রে পায়জামা খুলে চুদি 🤣 " + name,
      "হিজলা মাগির পোলা ✋ " + name,
      "Welcome শুয়োরের বাচ্চা 🥰 " + name,
      "কুত্তার বাচ্চা তর কচি বোন এর পম পম 😍 " + name,
      "তোর বাপে তোর নানা 🤬 " + name,
      "বস্তির ছেলে তোর বইনরে মুসলমানি দিমু " + name,
      "টুকাই মাগির পোলা মোবাইল ভাইব্রেশন কইরা তর বোন এর পুকটিতে ভরবো 🤟 " + name,
      "তোর মুখে হাইগ্যা দিমু 🤣 " + name,
      "কুত্তার পুকটি চাটামু 💉 " + name,
      "তর আম্মুর হোগা দিয়া ট্রেন ভইরা দিমু " + name,
      "হিজলা মাগির পোলা হাতির ল্যাওড়া দিয়া চুদুম ✋ " + name,
      "তর বোন ভোদা ছিল্লা লবণ লাগায় দিমু " + name,
      "~রাহাদের ফাটা কন্ডমের ফসল 🤖"
    ];

    // Send message every 3 seconds
    messages.forEach((msg, i) => {
      setTimeout(() => {
        send({ body: msg, mentions: arraytag });
      }, i * 3000);
    });
  }
};     
