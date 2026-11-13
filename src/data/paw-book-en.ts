// English version of the memory book, based on "My First Year with You" (Oh Paw Studio).
// Same structure and same order of fields as paw-book-de.ts (answers are stored by position, so both languages share them).
import { finalize, head, list, long, makeMonth, note, photo, short, table, type RawUnit, type Unit } from "./paw-book-core";

const month = makeMonth("03 · Our First Year – Month by Month", "Month");
const dateLine = "Date or period:";
const lookBack = "When I look back on this later, I want to remember that ...";

const months: RawUnit[] = [
  month({
    n: 1,
    title: "Everything Is New",
    subtitle: "Two lives still adjusting to each other.",
    intro:
      "The first month together is full of little discoveries. You're getting to know my habits, I'm discovering your quirks – and little by little we figure out how our daily life fits together.\n\nMaybe there's still a lot that feels unfamiliar. Maybe you've already found a favorite spot, recognize familiar sounds, or know exactly when it's playtime. Some changes are obvious right away. Others only show up over time. It's not about how much happened this month. It's about what made this beginning special for us.",
    impulse:
      "What was new this month? Which little quirk did I discover in you? And was there a moment when I thought for the first time: we're slowly settling in together?",
    q: {
      subtitle: "Two lives still adjusting to each other.",
      intro:
        "I got to know you while you discovered your new world. Some things were exciting, others maybe still unfamiliar. And somewhere between the first exploring tours and the quiet moments, our life together began.",
      fields: [
        long("What kept you busiest in your new everyday life?"),
        long("Which qualities did I discover in you this month?"),
        long("A moment from this month I don't want to forget:"),
        long("What has already become more familiar to us?"),
        long("Where did you feel comfortable first?"),
        long("Was there a moment when I thought: now you feel at home?"),
      ],
    },
    photo: {
      subtitle: "Our first month in pictures",
      intro:
        "A photo doesn't have to be perfect to hold a memory. Maybe it shows your favorite spot, a new toy, a sleepy morning, or just an ordinary moment that already feels familiar.",
      fields: [photo("A photo from our first month"), short(dateLine), long("What's happening in this picture:"), long(lookBack)],
    },
  }),
  month({
    n: 2,
    title: "You're Getting Braver",
    subtitle: "Trust grows in small steps",
    intro:
      "Slowly the new home is becoming a familiar place. Maybe you're discovering new corners, showing more of your personality, or trying things you didn't dare try at first.\n\nWith every day, I learn a little more about what makes you curious, what makes you feel safe, and what makes you purr. Some changes are clearly visible. Others only show when I compare my memories with those from the beginning.\n\nMaybe something that felt unfamiliar at first now seems completely natural. Or I'm discovering a quirk in you that I hadn't noticed at all in the first month.\n\nSomething new doesn't have to happen every day. Quiet moments and small steps are part of our story, too.",
    impulse:
      "When I think back to our first month: What feels more familiar now? What have you discovered for yourself? And which new side of your personality did I get to know?",
    q: {
      subtitle: "What has changed",
      intro:
        "Maybe you've discovered new corners, shown more of your personality, or tried things you didn't dare try at first.\n\nWith every day, I learned a little more about what makes you curious, what makes you feel safe, and what makes you purr.",
      fields: [
        long("What did you newly discover this month?"),
        long("Was there something you were cautious about at first that's already more familiar now?"),
        long("Which quirk did I notice most this month?"),
        long("Which shared moment made me smile most?"),
        long("Have you found a new favorite spot or a new favorite game?"),
        long("What feels completely natural in our daily life by now?"),
        long("What I learned about you this month:"),
      ],
    },
    photo: {
      intro:
        "Sometimes photos show changes that are hardly noticeable in everyday life. Maybe you look much more confident in a picture, curiously explore a new place, or lie at your favorite spot as if it's the most natural thing in the world.\n\nCapture one of these moments – whether it's a little adventure or a quiet moment.",
      fields: [photo("A photo from our second month"), short(dateLine), long("What's happening in this picture:"), long("What makes this month special:"), long(lookBack)],
    },
  }),
  month({
    n: 3,
    title: "Your Little Personality",
    subtitle: "You're not just any cat",
    intro:
      "Every day I get to know you a little better. I discover what makes you curious, what makes you happy, and which little quirks make you unmistakable.\n\nMaybe you're brave, playful, cuddly, or cautious at first. Maybe you have a mind of your own and keep surprising me with the way you explore the world.\n\nYour personality doesn't only show in special moments. Often it's hidden in the little repetitions: in how you seek my attention, play, rest, or react to new situations.\n\nAnd while I'm getting to know you better and better, you're free to keep developing. What I note down about you today is a loving look at the little personality I'm discovering right now.",
    impulse:
      "Describe not only what you're like, but also how I can tell. Sometimes a small situation says more than three fitting words.",
    q: {
      subtitle: "That's just you",
      intro:
        "And at some point you realize: you're not just any cat. You're exactly you – with your own mind, your little quirks, and your very personal way of seeing the world.",
      fields: [
        list("Which three words describe you best right now?"),
        long("Which habit is typical of you?"),
        long("What do you do in your very own way?"),
        long("How do you demand my attention?"),
        long("How can I tell you feel comfortable?"),
        long("A little situation that shows your personality especially well:"),
      ],
    },
    photo: {
      subtitle: "Our third month in pictures",
      intro:
        "Some pictures don't just capture a moment, they also show a piece of your personality. Maybe your curious look, your playful side, your favorite way to cuddle, or one of those moments when you're completely yourself.",
      fields: [photo("A photo that shows your personality"), short(dateLine), long("What's happening in this picture:"), long("What makes this moment so typical of you:"), long(lookBack)],
    },
  }),
  month({
    n: 4,
    title: "More and More You",
    subtitle: "The little things become familiar",
    intro:
      "Over time, some things become second nature. I know better and better when you want to play, where you like to sleep, and which little rituals are part of our daily life.\n\nMaybe you have a toy you keep bringing out, a favorite spot you've picked just for yourself, or a certain time of day when you get especially active. Maybe you even have a preference I never would have expected.\n\nLittle things like these often seem obvious in everyday life. But they say a lot about what makes you you and what our life together looks like.\n\nYour preferences can change. That's why I want to note down what's typical of you right now – as a little snapshot of our time together.",
    impulse:
      "Which things have become a natural part of your daily life? What do you especially like? And is there a little habit or preference that keeps surprising me?",
    q: {
      subtitle: "Your little favorites",
      intro:
        "Maybe you now have a favorite spot, a particular toy, or a little ritual you look forward to every day.",
      fields: [
        short("What's your absolute favorite thing right now?"),
        short("Which ritual do we share by now?"),
        short("What must never be missing from your day?"),
        short("Your favorite toy:"),
        short("Your favorite spot:"),
        short("Your favorite time of day:"),
        short("Your favorite snacks or food preferences:"),
        short("An unusual preference of yours:"),
      ],
    },
    photo: {
      subtitle: "A look at your favorite things",
      intro:
        "Maybe it's the spot by the window, a particular toy, or a little corner you keep going back to. Sometimes it's exactly what we see every day that shows how special our daily life together has become.",
      fields: [photo("A photo of your favorite spot or favorite toy"), short(dateLine), long("What you love about it:"), long("A little story or memory I connect with it:"), long(lookBack)],
    },
  }),
  month({
    n: 5,
    title: "Little Adventures",
    subtitle: "Not every adventure begins outside the front door",
    intro:
      "An adventure doesn't have to be big. Sometimes a new cardboard box is enough, a sunny spot, or a corner nobody has explored yet. Sometimes it's a new game, a trip together, or a situation that surprises us both.\n\nWith every shared experience, new memories are made. Some make us laugh, others show me how curious you are and how much you love discovering your world.\n\nWe don't have to plan anything special to experience something. Often it's the unplanned moments that later make a lovely story.",
    impulse:
      "What surprised us this month? Which little adventure would you love to experience again? And which story would I tell someone who asks me about our best moments together?",
    q: {
      subtitle: "An adventure doesn't have to be big.",
      intro:
        "Sometimes a new box is enough, a sunny spot, or a corner nobody has explored yet. Sometimes it's a trip together or a situation neither of us will forget anytime soon.",
      fields: [
        long("What was our best little adventure this month?"),
        long("What made you especially curious?"),
        long("Did we try something together for the first time?"),
        long("What was the funniest moment?"),
        long("What did you surprise me with?"),
        long("Which moment would I like to experience again?"),
        long("The little adventure I want to keep telling stories about:"),
      ],
    },
    photo: {
      subtitle: "Our little adventure in pictures",
      intro:
        "A photo captures a moment. The story behind it turns it into a memory.\n\nMaybe the picture shows your first encounter with something new, an especially curious moment, or a situation I still have to laugh about today. It doesn't have to be a perfect photo – what matters is that it reminds us of something we experienced together.",
      fields: [photo("Our little adventure"), short(dateLine), long("The story behind this picture:"), long("What was special about this moment:"), long(lookBack)],
    },
  }),
  month({
    n: 6,
    title: "Halfway There, Little Wonder",
    subtitle: "A good time to look back",
    intro:
      "Six months of life together can feel both short and long at the same time. Maybe you still remember those first days exactly. Maybe you're only now noticing how much has changed since then.\n\nThe first cautious encounters have become familiar moments. You've shown your quirks, discovered new things, and settled a little more into my daily life. And while a lot of it seems natural by now, our shared story lives in all these little changes.\n\nThe halfway point is a lovely occasion to pause for a moment and look back. Not to judge what has changed, but to notice what has grown over these six months – and what has been part of you from the start.",
    impulse:
      "Choose a photo from your early days and compare it with a current picture. What do you notice? What has changed? And what has surprisingly stayed the same?\n\nSometimes you only see how much time has passed when you compare directly. Note down what you notice – even the little things.",
    q: {
      subtitle: "Then and now",
      intro:
        "Some moments still feel brand new. Others already belong to our shared story as if they'd always been there.\n\nA good time to look back and discover how much has already changed – and what has defined us from the start.",
      fields: [
        long("What has changed most since we began?"),
        long("What's my favorite memory from the past months?"),
        long("What keeps surprising me about you?"),
        long("What was different at the beginning compared with today?"),
        long("Which quirk has stayed from the very start?"),
        long("What have I learned from you?"),
        long("When I think of our first days, I'm especially grateful for ..."),
      ],
    },
    photo: {
      subtitle: "Six months with you",
      intro:
        "Two pictures, two points in time, and six months full of little stories in between.\n\nChoose a photo from your early days and a current picture. Maybe you'll see how much you've grown, how comfortably you move around now, or how some of your quirks have stayed the same from the beginning.\n\nIt's not about making the difference as big as possible. Sometimes it's exactly what stayed the same that tells a particularly beautiful story.",
      fields: [photo("A picture from the beginning"), short(dateLine), photo("A current picture"), short(dateLine), long("When I compare these two pictures, I notice ..."), long("Six months with you in one sentence:")],
    },
  }),
  month({
    n: 7,
    title: "Our Everyday Life",
    subtitle: "Little moments become familiarity",
    intro:
      "A year together doesn't consist only of special events. It also consists of completely ordinary everyday life: greetings, playtimes, rest periods, and the little rituals that often develop quite casually.\n\nMaybe you greet me in your own way, have a regular spot near me, or remind me every day when it's time for a play break. A lot of it feels natural by now. But it's exactly these little habits that show what our life together looks like.\n\nThis page invites me to pause for a moment and consciously notice everyday life. Because what seems ordinary today may be exactly what I long for when I flip back through these pages later.",
    impulse:
      "What does a completely ordinary day with you look like right now? What happens in the morning, how do we spend our time together, and which little moment simply belongs by now?\nYou don't have to experience anything special to capture something. Even a perfectly normal day is part of our story.",
    q: {
      subtitle: "Not every special moment is spectacular.",
      intro:
        "Often it's the ordinary days that turn out to be the loveliest memories. The greeting when I come home. Your favorite spot near me. The little rituals we no longer have to think about.",
      fields: [
        long("What does a typical day with you look like right now?"),
        long("How do you greet me when I come home?"),
        long("Which little ritual is now a fixed part of our day?"),
        long("Where do you like to be most when I'm at home?"),
        long("What do we especially like doing together?"),
        long("Which unremarkable moment makes me smile again and again?"),
        long("What would I miss if it were no longer part of our daily life?"),
      ],
    },
    photo: {
      subtitle: "A completely ordinary moment",
      intro:
        "Sometimes it isn't the big experiences that touch us most. It's the moment you lie down next to me, accompany me through my day, or simply are where I like you best.\n\nCapture a moment that describes your everyday life especially well right now. Maybe it's your favorite spot, your shared playtime, or a little ritual that has long felt completely natural.",
      fields: [photo("A moment from our everyday life"), short(dateLine), long("What's happening in this picture?"), long("Why does this moment belong to us?"), long("When I remember our everyday life later, I don't want to forget that ...")],
    },
  }),
  month({
    n: 8,
    title: "Unmistakably You",
    subtitle: "Some quirks become favorite stories",
    intro:
      "Maybe there's a habit that makes me laugh again and again. Maybe you have your very own way of getting my attention, showing what you want, or retreating to your favorite spot.\n\nIt's often the little things by which I recognize you instantly. Some of it is typical of you, some only the two of us understand. Over time these quirks become familiar rituals, and some moments become stories I'll want to tell for a long time.\n\nThis month belongs to everything that makes you unmistakable. Not because you have to do anything special, but because you're you in your very own way.",
    impulse:
      "Which quirk of yours would I recognize instantly? What do you do in a way that's only you? And which little story would I like to tell one day when someone asks what makes you so special?",
    q: {
      subtitle: "Only you do that",
      intro:
        "And there are things only you do like this. Quirks that make me laugh, little oddities that belong to you, and moments when I wonder what's going on in your head.",
      fields: [
        long("Which habit makes me laugh again and again?"),
        long("How do you ask for something you want? Which sound or movement is typical of you?"),
        long("What do you do in a way I only know from you?"),
        long("Which of your quirks do I find especially lovable?"),
        long("Is there a little ritual we'd both recognize immediately?"),
        long("Which story about you do I absolutely have to capture?"),
      ],
    },
    photo: {
      subtitle: "That's so typically you",
      intro:
        "Sometimes a single movement, a certain look, or a familiar sound is enough, and I know right away what you're up to.\n\nCapture one of these moments. Maybe it's a funny habit, a typical sleeping position, or your very own way of showing me what you want. The photo doesn't have to be perfect – it should show you as you really are.",
      fields: [photo("A quirk that's typical of you"), short(dateLine), long("What are you doing in this picture?"), long("Why is that so typical of you?"), long("When I look at this picture later, I'll surely smile again, because ...")],
    },
  }),
  month({
    n: 9,
    title: "So Much Happened",
    subtitle: "A collection of little stories",
    intro:
      "After many months together, a personal treasure of memories slowly builds up. Maybe there's an experience I think back on often. Maybe it's several little moments that together make up this month.\n\nSome memories stay in my mind because of a single instant. Others only become special when I recall the little details: your look, my reaction, the unexpected, or the feeling that moment left behind.\n\nI don't have to tell everything in order, and I don't have to capture every day. What matters is which stories I'd like to find again later.",
    impulse:
      "Choose a story from this month and tell it as if you were telling someone who wasn't there. What happened? What made the moment special? Which little details do I absolutely not want to forget?\n\nA photo can be the beginning of the story – my words make it complete.",
    q: {
      intro:
        "Some memories consist of a single moment. Others are made up of many little moments that only form a whole story in hindsight.\nThis month is an invitation to look once more at what we've experienced.",
      fields: [
        long("Which memory from this month do I want to keep forever?"),
        long("What did we experience together that mattered especially to me?"),
        long("Which moment was completely different from what I expected?"),
        long("What do I still laugh about today when I think of it?"),
        long("Which little detail might I forget without this book?"),
        long("The story I'd like to tell again later:", { rows: 5 }),
      ],
    },
    photo: {
      subtitle: "A story that stays",
      intro:
        "Choose a photo from this month that reminds you of a special experience. It doesn't have to be an extraordinary moment. Maybe there's a funny incident behind the picture, a little surprise, or a memory that only means something to the two of you.\n\nTell what happened in the picture and what you can't see when you just look at it.",
      fields: [photo("Our photo of the month"), short(dateLine), long("What happened in this picture?"), long("The story behind this moment:"), long("What do I want to remember exactly like this later?")],
    },
  }),
  month({
    n: 10,
    title: "The Little Things",
    subtitle: "What's taken for granted today can be precious tomorrow",
    intro:
      "The more familiar we become with each other, the more easily I sometimes overlook the little details. The way you sleep, a certain look, or a movement I recognize instantly.\n\nMaybe you don't even notice how often I smile about such little things. But they're exactly what makes our daily life one of a kind and tells so much about who you are.\n\nOver time some things become so natural that I hardly notice them anymore. All the nicer to notice them again for a moment and capture them.",
    impulse:
      "Watch yourself consciously for a moment. What do you do when you feel safe? What little sounds do you make? Which gesture do I know so well by now that I know right away what you want?\n\nYou don't have to make a big story out of it. Sometimes a single sentence is enough to hold on to a little memory forever.",
    q: {
      intro:
        "Maybe it's a certain look, a soft sound, or the way you snuggle in. Maybe it's the movement of your paws when you dream, or the way you look at me when you want something.\n\nIt's often not the big experiences that become the most familiar to us. It's the little things that repeat, that make me smile, and that eventually become inseparable from you.",
      fields: [
        long("Which detail about you do I never want to forget?"),
        long("Which look, sound, or movement is typical of you?"),
        long("Which unremarkable moment was especially precious this month?"),
        long("What does a typical cuddle or play moment look like?"),
        long("Is there a place or a sound I'll always associate with you?"),
        long("What do you do when you're tired or especially curious?"),
        long("Which little change have I noticed?"),
        long("A little detail that makes you you:"),
      ],
    },
    photo: {
      subtitle: "Little things, big memories",
      intro:
        "Some moments seem completely ordinary in everyday life. But when I think back on this year later, I want to be able to remember exactly those moments, too.\n\nChoose a photo that shows one of your little, unmistakable details. Maybe your typical look, your favorite sleeping position, or a moment when you're completely yourself.",
      fields: [photo("Our photo of the month"), short(dateLine), long("What can be seen in this picture?"), long("What makes this moment so typical of you?"), long("What do I want to remember exactly like this later?")],
    },
  }),
  month({
    n: 11,
    title: "Almost a Year",
    subtitle: "A beginning becomes a shared story",
    intro:
      "Soon our first year together will be behind us. Maybe I can hardly imagine anymore what my daily life looked like without you. What was new and unfamiliar at the beginning has long since become familiar. Our first days together have turned into an everyday life that feels completely natural to us.\n\nWhen I think back to our beginning today, I may notice things I didn't see back then. How much you've changed. How much I've learned about you. And how many little memories now belong to our story.\n\nThis month is a chance to pause once more and look back – not because everything is over, but because so much still lies ahead.",
    impulse:
      "Flip through the previous chapters. Which story had you almost forgotten? Which photo touches you especially today? Is there something you'd still like to capture before our first year together is complete?\n\nYou may add to earlier pages and expand your answers. Memories are allowed to grow with you.",
    q: {
      subtitle: "How quickly a little new creature can become a fixed part of life.",
      intro:
        "Almost a whole year lies behind us. Full of moments that belong only to us, full of habits that have become natural, and full of memories I wouldn't want to miss.\n\nWhen I think back to our beginning, I see not only how you've grown. I also see how we've gotten used to each other and how our shared story grew out of many single moments.",
      fields: [
        long("What has changed most since we began?"),
        list("Which three memories from our year matter most to me?"),
        long("What am I looking forward to when I think of our future?"),
        head("When I think back to the beginning ..."),
        long("Which of your qualities is especially clear today?"),
        long("What would I like to experience with you in the coming year?"),
      ],
    },
    photo: {
      subtitle: "Then and now",
      intro:
        "Sometimes all it takes is a single old photo to remember how it all began. One look at your former self – and suddenly changes become visible that happened quietly in everyday life.\n\nChoose two pictures: one from the beginning and one from today. Capture them side by side and keep a little snapshot of your shared development.",
      fields: [photo("How you were back then"), short(dateLine), photo("You today"), short(dateLine), long("What has changed:"), long("When I look at both pictures, I think about how ...")],
    },
  }),
  month({
    n: 12,
    title: "A Year with You",
    subtitle: "A year is a beginning, not an ending",
    intro:
      "Twelve months together. A whole year full of life, laughter, surprises, and little moments that have shaped our daily life.\n\nWhen I look back today, I see not only how much you've grown, but I also think of our first days together, of everything we've learned from each other, and of moments that may have been quite unremarkable yet will stay in my memory forever.\n\nNot every memory is written down. Not every day is photographed. And it doesn't have to be. This book can never capture everything that made our first year what it was. But it preserves part of our story – and reminds me how much can happen in such a short time.",
    impulse:
      "If I had to tell our time together in three pictures, which would I choose? What should these pictures tell about our story?\nAnd if I could keep only a single sentence for this year: which would it be?",
    q: {
      subtitle: "Twelve months full of life, laughter, surprises, and little moments.",
      intro:
        "Maybe not every day stayed in your memory. Maybe there were quiet times, exciting adventures, and moments that turned out completely differently than expected. But from all these days something has grown that belongs only to us.\n\nWhen I think of our first year, I don't have to be able to list every single memory. It's enough to know that you're now a fixed part of my life and that our story has only just begun.",
      fields: [
        long("What was my most beautiful moment in our first year together?", { rows: 4 }),
        long("What do you mean to me today?", { rows: 4 }),
        long("What would I like to pass on to you for the future?", { rows: 5 }),
      ],
    },
    photo: {
      subtitle: "Our year in pictures",
      intro:
        "Sometimes pictures say more than words could. Three little snippets from our first year together – each special in its own way and together a piece of our story.\n\nChoose a picture from the beginning, one of your favorite moments, and a current photo. They don't have to be perfect pictures. What matters is what you connect with them and which memory you want to keep in them.",
      fields: [photo("A picture from back then"), photo("A favorite moment"), photo("A current picture"), long("A sentence that describes our first year perfectly:", { rows: 3 })],
    },
  }),
];

const rawUnits: RawUnit[] = [
  {
    id: "intro",
    group: "Foreword",
    title: "Welcome",
    subtitle: "This book belongs to you and me.",
    pages: [
      {
        title: "Welcome",
        subtitle: "This book belongs to you and me.",
        intro:
          "Some stories begin with a plan. Others with a coincidence. And sometimes a single glance is enough to know that something very special is beginning.\n\nThis book tells our story. From my very first thoughts of you, through the little adventures of our everyday life, to all the moments I'll want to flip back to one day and live again.\n\nThere's room here for photos, little stories, funny quirks, and all the things that maybe nobody else would notice – but that mean everything to me.\n\nYou don't have to capture every moment or fill in every page. There's no right or wrong way to make this book your own.\n\nJust keep what matters to you.\n\nBecause in the end, it isn't perfect memories that count. It's yours.",
        fields: [short("Your name:"), short("Your nickname:"), short("This book was started on:")],
      },
      {
        title: "How Your Book Becomes Your Story",
        intro:
          "The best memories often happen quite by accident. Sometimes they're the big moments, sometimes just a familiar look, a new sound, or a little habit that makes us smile.\n\nYou don't have to fill in this book in order or from start to finish. Use the questions as inspiration and write down whatever you'd like to remember later.\n\nA few ideas for your entries:\n• Write the way you talk. Short sentences, funny observations, and little anecdotes make your memories personal.\n• Add photos and dates. A picture, an approximate date, or a sentence can help you remember the situation later.\n• Leave room for real life. Some questions will suit you, others won't. Skip them, add your own thoughts, or use the blank space.\n• Note the everyday things, too. Where did you like to sleep most? Which habit did you only notice after a few weeks? What made you laugh?\n\nYou can fill in the pages right away or come back to them later. There's no schedule and no obligation to use every line.\n\nThis book is here for your memories – not the other way around.",
        fields: [],
      },
    ],
  },
  {
    id: "k1",
    group: "01 · Before We Found Each Other",
    no: "Chapter 01",
    title: "Before We Found Each Other",
    subtitle: "We didn't yet belong in each other's everyday lives.",
    intro:
      "Sometimes we wait for each other without knowing it. And sometimes we meet completely unexpectedly.\n\nBefore you moved in with me, there was a time when I didn't know you yet. Maybe I'd been looking for a cat, maybe the decision had been a long time coming. Or maybe I came across you by chance and couldn't stop thinking about you afterward.\n\nSomething led me to you. Maybe it was your gaze in a photo, your curious nature, or simply the feeling that I had to get to know you.\n\nThis is where the story that came before your arrival begins.",
    pages: [
      {
        fields: [
          long("How did you come into my life?"),
          long("What fascinated me about you first?"),
          long("Was it a photo, your looks, a description of your personality, or something I only understood later?"),
        ],
      },
      {
        title: "Before We Found Each Other",
        subtitle: "What did my everyday life look like before you became part of it?",
        fields: [
          long("What was typical of my life back then? What was I hoping would change, and what was I looking forward to?"),
          long("The moment I knew: you were meant to be the one:"),
          short("Date:"),
          long("What I remember most:"),
          long("Back then I didn't yet know that ..."),
          photo("A photo from the time before you moved in, or the first picture of you."),
        ],
      },
    ],
  },
  {
    id: "k2",
    group: "02 · You're Finally Here",
    no: "Chapter 02",
    title: "You're Finally Here",
    subtitle: "And then came the day we'd been waiting for.",
    intro:
      "Anticipation became reality. Suddenly you were here – and the way I'd imagined life with you turned into our first shared experiences.\n\nMaybe everything went just as we'd pictured it. Maybe it turned out completely different. The ride home, your first look at your new surroundings, your first favorite spot, or the first night: it's often exactly these little details that make a beginning unforgettable.\n\nWhich moments would you like to remember later?\n• Our first look and first touch\n• The ride home and your first steps in your new home\n• The place you explored first\n• Your first favorite spot\n• Our first night together\n• The moment everything felt a little more familiar\n\nYou don't have to write everything down right away. Some things stay in your memory, and others may only come back to you when you look at old photos.",
    pages: [
      {
        title: "From Anticipation to Our Shared Story",
        subtitle: "And suddenly you were part of my life.",
        intro:
          "Anticipation became reality. You were here – with your very own way of being, your curiosity, and a whole new little world to discover together.\n\nMaybe you were cautious at first. Maybe you curiously explored your surroundings right away. Maybe everything was also a bit different from what I'd imagined.\n\nWith you came new sounds, first touches, and unfamiliar situations. And while you were getting to know your new home, a whole new everyday life began for me, too – with you at my side.",
        fields: [
          head("Your Profile"),
          short("Your name:"),
          short("Your nickname:"),
          short("Born on (or estimated date of birth):"),
          short("Moved in with me on:"),
          short("How old were you when you moved in?"),
          short("Your breed or special features:"),
          short("Your coat color:"),
        ],
      },
      {
        title: "You're Finally Here",
        intro:
          "Every meeting has its own story. Maybe you wrapped me around your paw right away. Maybe you were reserved at first. Or maybe I knew from the very first photo that I just had to meet you.\n\nToday I'm remembering the beginning of our story together.",
        fields: [
          long("Where did you live before you moved in with me?"),
          long("How did we first meet?"),
          long("What stood out to me most when we first met?"),
          long("What was going through my mind when I knew you were moving in?"),
          head("Welcome home"),
          long("How was your ride home?"),
          long("What did you explore first?"),
          long("Where did you first feel comfortable?"),
          long("Which spot was your first favorite?"),
        ],
      },
      {
        title: "Your New World",
        intro:
          "The first hours and nights often have a story all their own. Maybe you curiously explored everything, maybe you looked for a safe spot first. Little by little the new place became a home – with familiar people, small routines, and maybe even animal housemates.",
        fields: [
          long("What were our first hours together like?"),
          head("Our first night"),
          long("Where did you sleep?"),
          long("Which sounds or little moments have stayed with me?"),
          long("How did I feel on that first night?"),
          head("Your home & your housemates"),
          long("How do you live? (Just you and your humans? With other cats? With dogs? With other animals?)"),
          long("Who is part of your family? Names (and species) of your housemates:"),
          long("How did you react to each other?"),
        ],
      },
      {
        title: "A Picture from the Beginning",
        intro:
          "Sometimes a single photo says more than we can put into words. Maybe it shows you in your new home, snuggled up in your first favorite spot, or right in the middle of your first exploring tour.",
        fields: [
          photo("Here's room for a photo from your first days:"),
          short("Date or period:"),
          long("I want to hold on to this moment because ..."),
          long("What I love most about this photo:"),
          long("When I think back to your first days, I remember ..."),
        ],
      },
      {
        title: "Our Home Becomes Your Home",
        subtitle: "A new place. So many new impressions. And, with time, a place for you.",
        intro:
          "When you moved in with me, a lot was still unfamiliar. New smells, strange sounds, different rooms, and people who first had to become familiar companions.\nMaybe you bravely explored every corner. Maybe you preferred to hide first and watch everything from a safe distance. Every cat has their own pace when getting used to a new environment.\nEvery day brought something new to discover. A spot where you loved to sleep. A sound that made you curious. Or a small routine that gradually turned our home into your home, too.",
        fields: [
          long("Where did you like to spend your time at the beginning?"),
          long("Was there a place where you felt especially safe?"),
          long("What did you curiously explore – and what still seemed a little unsettling at first?"),
          long("Which little habit developed in your first few days?"),
          long("What helped us settle in with each other?"),
        ],
      },
      {
        title: "Our Home Becomes Your Home",
        subtitle: "A look back",
        intro:
          "Maybe there's a photo of your first nap, your cautious exploring tour, or the unusual spot you picked for sleeping.",
        fields: [
          long("A moment from your settling-in time that I want to remember:"),
          photo("The photo for it, or a little snapshot from your first days"),
        ],
      },
    ],
  },
  {
    id: "k3",
    group: "03 · Our First Year – Month by Month",
    no: "Chapter 03",
    title: "Our First Year – Month by Month",
    subtitle: "A year with you. Twelve chapters. And no story like another.",
    intro:
      "Your first year together can't be divided into fixed steps. Maybe a lot changes in the first weeks. Maybe you need time to get used to each other. That's how your book becomes your story.\n\nSome changes you notice right away. Others you only recognize later – when you compare a photo from the beginning with a current one, or remember something that has long since become second nature.\n\nThat's why Month 01 begins with your move-in. No matter how old you are at that point. This book accompanies your time together, not just your cat's first year of life.\n\nHow the monthly chapters work:\nEach month invites you to capture special experiences, little quirks, and everyday moments. You'll find questions, extra memory prompts, and space for photos or personal notes.\n\nYou don't have to answer every question or document every month completely. Take what suits you. Maybe one month is full of new adventures, maybe it's mostly made up of familiar moments. Both belong to your story.\n\nA little tip: At the start of each month, note the date or period. That way you can later see when your memories were made.",
    pages: [{ fields: [short("Our first month together began on:")] }],
  },
  ...months,
  {
    id: "k4",
    group: "04 · What Makes You, You",
    no: "Chapter 04",
    title: "What Makes You, You",
    subtitle: "There are things that simply belong to you.",
    intro:
      "The way you sleep. The sounds you make. Your favorite spot, your little rituals, and the habits I have to laugh about again and again.\n\nWe've already captured some of these things in our monthly stories. Here we collect everything that makes you who you are, regardless of any particular point in time.\n\nBecause even when you change, some things stay unmistakably you.",
    pages: [
      {
        fields: [
          head("Your personality"),
          long("How would I describe your personality?"),
          long("Are you more curious, cautious, playful, cuddly, or something else entirely?"),
          list("Which three words fit you best?"),
          long("What makes your personality special? (What's typical of you – and what would come to mind right away if I had to describe you?)", { rows: 4 }),
        ],
      },
      {
        intro:
          "Some things make your daily life special. Certain spots, familiar toys, or little moments you keep seeking out. They belong to your very own little universe.",
        fields: [
          head("Your favorite things"),
          short("Your favorite toy:"),
          short("Your favorite spot for sleeping:"),
          short("Your favorite spot for watching:"),
          short("Your favorite game:"),
          short("Your special preferences:"),
          long("Is there something that always makes you happy or instantly curious?"),
          photo("Your favorite spots or favorite things"),
        ],
      },
      {
        intro:
          "Sometimes it's the little quirks that grow on us most. The things you do again and again in your very own way – and that make me laugh even though I've seen them a hundred times.",
        fields: [
          head("What do you do in your very own way?"),
          long("Which situation makes me laugh every time?"),
          long("Is there a look, a sound, or a movement I recognize right away?"),
          long("What is probably your funniest or most unusual habit?"),
          head("Our little rituals"),
          note("Some moments simply belong to us. Maybe they're fixed routines, shared games, or the way you seek my closeness."),
          long("What do we do together regularly?"),
          long("How can I tell you're seeking my closeness?"),
          long("What do probably only you and I understand?"),
        ],
      },
      {
        title: "That's Just You",
        intro:
          "It's not only the big moments that make you special. It's all the little things that add up to you.\n\nThere's room here for a picture of you that shows you exactly as you are: in your favorite moment, with your unmistakable look, or simply right out of your daily life.",
        fields: [long("What makes you unmistakable to me:", { rows: 3 }), photo("A place for your favorite photo – and for everything that can't be put into words.")],
      },
    ],
  },
  {
    id: "k5",
    group: "05 · A Year Full of Us",
    no: "Chapter 05",
    title: "A Year Full of Us",
    subtitle: "A year is only twelve months. But it's really made of countless little moments that together form our story.",
    intro:
      "There are the first times and the familiar repetitions. The exciting days and the quiet moments. The funny mishaps, the little progress, and the moments when I'm simply glad you exist.\n\nSome things stuck in my memory right away. Others I may only rediscover when I flip through the photos or read an old page.\n\nNow it's time to look back. Not to capture everything that happened, but to find again what made our first year special.",
    pages: [
      {
        title: "My Personal Year in Review",
        intro:
          "When I look back on our first year together, plenty of experiences come to mind. Some were big and exciting, others would have seemed quite ordinary to outsiders. But they all belong to our story.",
        fields: [
          long("What was my most beautiful moment with you?"),
          long("What surprised me most?"),
          long("What have I learned about myself through you?"),
          long("What has changed in my daily life since you've been here?"),
          long("Which moment would I like to experience again?"),
        ],
      },
      {
        title: "Little Things, Big Stories",
        intro: "Some memories are tiny. And yet they stay forever.",
        fields: [
          head("The first broken thing"),
          long("What had to give way to your curiosity, your claws, or your little adventures?"),
          long("When did it happen?"),
          head("Your first lost baby tooth"),
          long("When did we discover your first little tooth?"),
          long("Did we find it, or did it vanish without a trace?"),
          head("Your first little pranks"),
          long("What did you get up to that we didn't expect?"),
          long("What was your funniest or cheekiest moment so far?"),
        ],
      },
      {
        title: "Our Most Important Milestones",
        intro:
          "Not everything happens on a set schedule. Some moments can be planned, others come completely unexpectedly. And sometimes I only realize later how important a certain moment was for us.\nThere's room here for the events that matter to us – no matter when they took place.",
        fields: [table(["Date", "Our special moment"], 12)],
      },
      {
        title: "A Photo That Says It All",
        intro:
          "Sometimes there's a photo that tells more than many words. Maybe it shows a special moment, maybe a completely ordinary day. But as soon as I see it, I remember why I wanted to capture exactly this moment.",
        fields: [photo("Our photo"), long("Why I chose this picture:")],
      },
    ],
  },
  {
    id: "k6",
    group: "06 · A Special Day",
    no: "Chapter 06",
    title: "A Special Day",
    subtitle: "Your first birthday",
    intro:
      "A year has passed since our shared story began. The first cautious encounters have turned into familiar habits. You've grown, discovered new favorite spots, and found your very own place in my daily life.\n\nMaybe you're hardly recognizable when I think back to the first pictures. Maybe there are also things that are just the same as back then: your look, your little quirks, or the way you seek my closeness.\n\nNo matter what has changed – today it's all about you and all the memories we already share.\n\nThis day doesn't have to be big or extraordinary. It can simply be the way it suits you. Because the best part is that we get to experience it together.",
    pages: [
      {
        title: "Your First Birthday",
        intro:
          "A special day deserves a place in our memory book. Here I note how you are today, how we spent your birthday, and which moment I especially want to remember.",
        fields: [
          short("Today you're already this old:"),
          short("Birthday date:"),
          short("Your favorite toy right now:"),
          short("Your favorite spot right now:"),
          long("How we celebrated"),
          long("My most beautiful moment on your birthday"),
          photo("A picture of you on your special day"),
          long("A wish for your next year of life:"),
        ],
      },
    ],
  },
  {
    id: "k7",
    group: "07 · A Letter to You",
    no: "Chapter 07",
    title: "A Letter to You",
    subtitle: "For later, when I flip back",
    intro:
      "Maybe you'll never read this book. Maybe I'll open it again someday and remember what our life together looked like in this first year.\n\nYour look, your quirks, and our little routines. The things you did every day that are so familiar to me now that I hardly think about them. The moments I wanted to hold on to because I already knew back then that they'd be memories one day.\n\nMaybe I'll smile while reading, because I remember something that has long become natural. Maybe I'll be surprised at how small you once were or how much has changed since.\n\nThis letter is for a later moment. For the day I flip back and wonder how it all began. I want to remember how you are today, what I love about you, and what our first year together has meant to me.",
    pages: [
      {
        intro: "If I could tell you one thing today that you should know forever, it would be ...",
        fields: [
          long("What I especially love about you:"),
          long("What I never want to forget:"),
          long("What you've changed in my life:"),
          long("What I wish for our future:"),
          long("And if I ever forget how this first year felt, I want to remember one thing:"),
          long("What should always stay with me from our beginning:"),
        ],
      },
    ],
  },
  {
    id: "k8",
    group: "08 · Thank You for Being You",
    no: "Chapter 08",
    title: "Thank You for Being You",
    subtitle: "A year full of little paw prints on my heart.",
    intro:
      "A year full of shared moments, new habits, and memories that belong only to us.\n\nWhen this year began, I didn't yet know which stories we'd experience together. Which little quirks I'd discover in you, which routines would develop, and which seemingly ordinary days would later mean so much to me.\n\nThis book holds on to a part of our beginning. Not every day, not every encounter, and not every moment – but enough to remind me how much can happen in a single year.\n\nWhen I look back today, I see not only how much you've grown. I also see all the little moments that make up our life together. Things maybe nobody else would notice, and that's exactly why they belong to us so much.\n\nAnd while this first chapter of our story has now found its place in this book, so much is still waiting for us. New adventures, familiar days, and memories I don't yet know I'll want to keep one day.\n\nThank you for being part of my life.\n\nHere's to everything still to come. And to all the little moments that keep making our story our very own.",
    pages: [
      {
        title: "Our Story – So Far",
        fields: [short("Your name:"), short("Our first day together:"), short("Our first year captured on:"), photo("A photo that sums up our first year for me")],
      },
    ],
  },
  {
    id: "k9",
    group: "09 · For Everything That Deserves Its Own Place",
    no: "Chapter 09",
    title: "For Everything That Deserves Its Own Place",
    intro:
      "Not every memory can be assigned to a particular month. Some experiences happen quite casually, others only come back to you much later. Maybe there's a photo you absolutely want to keep, a funny incident, or a little moment that still brings a smile to your face today.\n\nThis page is for everything that doesn't have to fit into any other chapter. For memories that deserve their own place – no matter when they happened.",
    pages: [{ fields: [long("What happened?"), long("When was that, roughly?"), long("Why do I want to remember this?"), photo("A photo or a little memento")] }],
  },
  {
    id: "k10",
    group: "10 · From the Beginning to Today",
    no: "Chapter 10",
    title: "From the Beginning to Today",
    intro:
      "Sometimes it only becomes clear when you compare pictures how much time has passed. Photos don't just show how your cat looked. They also preserve familiar places, special moods, and little details that easily get forgotten in daily life.\n\nChoose three pictures from your first year together: one from the beginning, one from the time in between, and one from today. They don't have to be perfect portraits. Spontaneous shots often tell the loveliest stories.",
    pages: [
      {
        fields: [
          photo("A picture from the beginning", "How it all began."),
          photo("A picture from our middle", "A moment from the time when you were getting to know each other better and better."),
          photo("A picture from today", "This is what your life together looks like now."),
          long("When I look at these pictures, I think about how ...", { sub: "What do you notice when you compare them? Which changes do you see? And which things have perhaps stayed exactly the same?" }),
        ],
      },
    ],
  },
  {
    id: "k11",
    group: "11 · This Book Is Allowed to Keep Growing",
    no: "Chapter 11",
    title: "This Book Is Allowed to Keep Growing",
    intro:
      "With these pages, the story of your first year together ends – but not your time together.\n\nMaybe you'll open this book again in a few months. Maybe you'll find a photo that absolutely belongs in it, remember a little incident, or want to capture a thought that only occurs to you with some distance.\n\nYou can leave this book as it is. Or you can let it grow along with you and add what seems important to you bit by bit. There's no right or wrong and no complete picture of what your story has to look like.\nBecause not everything has to be written down or photographed. Some memories simply stay with you. Others deserve their own place on these pages.",
    pages: [{ fields: [long("A memory I'd still like to add:"), long("A thought I'm taking with me from this year:", { rows: 5 })] }],
  },
  {
    id: "k12",
    group: "12 · Capturing the Little Changes",
    no: "Chapter 12",
    title: "Capturing the Little Changes",
    subtitle: "Weight and observations at a glance",
    intro:
      "Cats develop individually. Age, background, health, nutrition, and many other factors can influence how they change physically and in their behavior.\n\nThis book isn't meant to set milestones that have to be reached by a particular time. Rather, it should let you collect observations and important information in an organized way.\n\nHow lovely when you can later see how your own cat has developed. With regular entries you can collect weight, physical changes, and special observations clearly.\n\nYou don't have to document everything. Just note the information that matters to you. Always add the date so you can sort your entries correctly later.",
    pages: [{ fields: [table(["Date", "My cat's age", "Weight", "My notes"], 6)] }],
  },
  {
    id: "k13",
    group: "13 · Important Information in One Place",
    no: "Chapter 13",
    title: "Important Information in One Place",
    subtitle: "Health and care at a glance",
    intro:
      "Health information is part of the story of your first year together, too. With clear records you can later see when you visited the vet with your cat, what information you received, and whether further appointments were made.\n\nAlso keep important documents such as the vaccination record, test results, and treatment information safe. These pages help you keep the most important details together and within reach.",
    pages: [
      { fields: [table(["Date", "Reason for visit", "Findings/Info", "Treatment/Medication", "Follow-up/next appt."], 10)] },
      {
        title: "Vaccinations and Preventive Care",
        fields: [
          table(["Date", "Vaccination/Preventive care", "Notes", "Next appointment"], 10),
          short("Veterinary practice:"),
          short("Phone number:"),
          short("Emergency clinic:"),
          short("Emergency clinic phone number:"),
          long("Special notes on my cat's health:"),
          note("These pages are for personal record-keeping and do not replace a veterinary examination or advice. For vaccinations, preventive care, and treatments, follow the recommendations of your veterinarian."),
        ],
      },
    ],
  },
  {
    id: "outro",
    group: "From Me to You",
    title: "From Me to You",
    intro:
      "I filled this book for you – with our memories, my thoughts, and all the little moments I want to keep forever.\n\nSo that later on we can still remember how it all began.\n\nWith love,\nYour Name\n\nForever in my heart.",
    pages: [{ fields: [short("With love, your name:"), short("Completed on:")] }],
  },
];

export const bookUnitsEn: Unit[] = rawUnits.map(finalize);
