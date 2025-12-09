# 💼 Deal or No Deal

En fullfjädrad webbimplementation av det klassiska TV-spelet "Deal or No Deal" byggd med Vue 3, TypeScript och Vite.

## 🎮 Om Spelet

Deal or No Deal är ett spel om chans och strategi där spelaren väljer en väska att behålla, och sedan progressivt eliminerar andra väskor för att avslöja deras innehåll. Efter varje runda gör den mystiska "Bankmannen" ett erbjudande för att köpa spelarens väska. Spelaren måste bestämma: **Deal eller No Deal?**

## ✨ Funktioner

- **20 Väskor** med slumpmässiga belopp från 1 kr till 1,000,000 kr
- **Progressiva Rundor** med strategiska beslutspunkter
- **Bankerbjudanden** beräknade baserat på kvarvarande belopp och spelprogressionen
- **Avslöjande Animationer** för dramatiska väsköppningar
- **Slutligt Val** - behåll din originalväska eller byt med den sista kvarvarande
- **Rent, Intuitivt Gränssnitt** med responsiv design
- **Typsäker** implementation med TypeScript

## 🚀 Komma Igång

### Förutsättningar

- Node.js (version 16 eller högre)
- npm eller yarn

### Installation

1. Klona repositoryt:
```bash
git clone <repository-url>
cd deal_or_no_deal
```

2. Installera beroenden:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

4. Öppna din webbläsare och navigera till `http://localhost:5173`

## 🛠️ Tillgängliga Kommandon

- `npm run dev` - Starta utvecklingsservern
- `npm run build` - Bygg för produktion
- `npm run preview` - Förhandsgranska produktionsbygget lokalt

## 🎯 Spelregler

1. **Välj Din Väska**: Välj en väska som ska vara din - du kommer inte veta vad som finns inuti förrän slutet
2. **Öppna Väskor**: Varje runda, öppna ett specifikt antal andra väskor:
   - Runda 1: 6 väskor
   - Runda 2: 5 väskor
   - Runda 3: 4 väskor
   - Runda 4: 3 väskor
   - Runda 5: 2 väskor
   - Runda 6: 1 väska
3. **Bankmannens Erbjudande**: Efter varje runda gör Bankmannen ett erbjudande baserat på de kvarvarande beloppen
4. **Deal eller No Deal?**: Acceptera erbjudandet och avsluta spelet, eller avvisa det och fortsätt spela
5. **Slutligt Val**: Om du når slutet, välj att behålla din originalväska eller byt med den sista kvarvarande väskan

## 📁 Projektstruktur

```
deal_or_no_deal/
├── src/
│   ├── components/          # Vue-komponenter
│   │   ├── WelcomeScreen.vue
│   │   ├── ChooseCase.vue
│   │   ├── GameBoard.vue
│   │   ├── Briefcase.vue
│   │   ├── AmountBoard.vue
│   │   ├── BankOffer.vue
│   │   ├── FinalChoice.vue
│   │   ├── RevealModal.vue
│   │   └── GameOver.vue
│   ├── composables/         # Composable-funktioner
│   │   └── useGameState.ts  # Huvudsaklig spellogik
│   ├── utils/               # Verktygssfunktioner
│   │   └── bankOffer.ts     # Beräkning av bankerbjudande
│   ├── constants.ts         # Spelkonstanter
│   ├── types.ts             # TypeScript-typer
│   ├── App.vue              # Huvudapplikationskomponent
│   └── main.ts              # Applikationens ingångspunkt
├── public/                  # Statiska resurser
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧩 Nyckelkomponenter

- **WelcomeScreen**: Initial spelskärm med regler och startknapp
- **ChooseCase**: Gränssnitt för att välja spelarens väska
- **GameBoard**: Huvudsakligt spelgränssnitt som visar alla väskor
- **Briefcase**: Individuell väskkomponent med öppna/stängda lägen
- **AmountBoard**: Visning av alla belopp och deras avslöjandestatus
- **BankOffer**: Modal för att presentera och hantera bankerbjudanden
- **FinalChoice**: Slutligt beslutsgränssnitt - behåll eller byt
- **RevealModal**: Animerad avslöjning av öppnade väskbelopp
- **GameOver**: Slutspelsskärm som visar vinster

## 🎨 Använda Teknologier

- **Vue 3** - Progressivt JavaScript-ramverk
- **TypeScript** - Typsäker JavaScript
- **Vite** - Nästa generations frontend-verktyg
- **Composition API** - Moderna Vue-utvecklingsmönster

## 🧮 Bankerbjudande-algoritm

Bankmannens erbjudande beräknas med en sofistikerad algoritm som tar hänsyn till:
- Genomsnitt av kvarvarande belopp
- Antal högvärdiga väskor kvar
- Nuvarande rundprogression
- Strategiska erbjudandejusteringar

## 🤝 Bidra

Känn dig fri att forka detta projekt och skicka in pull requests med förbättringar!

## 📝 Licens

Detta projekt är öppen källkod och tillgängligt för utbildningssyften.

## 🎲 Speltips och Strategi

- **Tidiga Rundor**: Försök eliminera låga belopp tidigt för att hålla högvärdiga väskor i spel
- **Bankerbjudanden**: Ökar generellt när osäkerheten minskar
- **Slutligt Val**: Statistiskt sett har behålla vs. byta lika sannolikhet, men dramatiken är verklig!

---

Byggd med ❤️ med Vue 3 + TypeScript + Vite
