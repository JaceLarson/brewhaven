# ☕ Brewhaven — a pixel coffee shop

A tiny browser game: serve customers by pouring coffee to the right level, earn
coins, and spend them on upgrades. All the pixel art is generated in code — no
image files — and the sound effects are synthesized with the Web Audio API, so
the whole thing is self-contained.

Built with [Phaser 3](https://phaser.io/) (loaded from a CDN).

## How to play

It's a level-based run — clear each level's quota without losing all your hearts.

- **Move the barista** between the stations with **A/D** or **←/→**.
- The order bubble's **border color** and the pulsing **sign** tell you which
  station to be at next.
- **Click a station** (the one you're standing at) or hold **SPACE** to pour.
  Release **inside the bright green zone** for a `PERFECT!` (big tip + hearts).
- **Stations & drinks unlock as the run progresses:**
  - **Level 1** — Espresso (espresso machine); the drip tower joins at L2 with
    **Drip** coffee, and **Tea** at L3.
  - **Level 5** — the **Milk & Cream station** arrives, with two-step drinks:
    **Latte** (espresso base + milk) and **Matcha** (tea base + milk). Pour the
    base into its zone, release, walk to the milk station, and top up to the
    final green zone — one cup, two pours, one serve. Misses on the base carry
    forward; two-step drinks pay more and those customers wait a bit longer.
  - **Level 10** — the **Soda Fountain**: **Cola**, and **Dirty Cola** (cola
    base + cream at the milk station).
- Chain good pours for a **combo multiplier** on your coins.
- **Hearts (×3):** you lose one when a customer **walks out**, you serve the
  **wrong drink**, or you **spill** (overfill). Lose all three → **Game Over**.
- **Clear a level** by serving its quota of correct drinks, then **pick one of
  three perk cards** (faster pour, wider zone, more patience, extra heart, a
  coin windfall, …).
- Your **best level** is saved between sessions and shown on the menu.

## The Store (spend your coins)

Hit the **🛍 STORE** button (top-right) any time during a level — it pauses the
action while you shop. Four tabs:

- **Upgrades** — repeatable mechanical boosts (Faster Pour, Generous Tips, Calm
  Crowd, Steady Hands, Combo Pro, Extra Heart). Each purchase levels the upgrade
  up and the next one costs more — the better it is, the pricier it gets. Each
  upgrade caps at level 10 (combined with picks of its matching perk card).
- **Walls** — re-theme the whole back wall (Brick, Sky, Forest, Sunset, Cozy
  Wood, …). Buy once, then equip any owned theme for free.
- **Coffee Makers** — reskin both machines (Matte Black, Mint, Copper, Gilded
  Brass).
- **Decorations** — a floor rug, potted plants, a sleeping shop cat, a neon
  sign, string lights, and wall art placed around the shop.
- **Staff** — unlocks once you clear Level 10. Hire a barista for an upfront
  fee, then assign them to one machine. Whenever the front customer's order
  needs that machine, the employee auto-pours a perfect fill and auto-serves
  — no handoff needed — while you're free to handle other steps. Each level
  you clear costs a wage deducted from your coins. A repeatable upgrade makes
  your employee pour faster.

**Cosmetics also carry a one-time perk** (shown in green on each card): a fancier
maker pours faster, the shop cat brings lucky tips, the neon sign boosts combos,
and so on. Pricier cosmetics give the bigger perks.

You still get a free perk card at the end of each level; the Store is where you
spend coins for more.

## Run it

Easiest: just open `index.html` in a browser (it needs internet for the Phaser
CDN). If your browser is fussy about local files, serve the folder instead:

```sh
# Python
python -m http.server 8000
# or Node
npx http-server -p 8000
```

Then visit http://localhost:8000

### Dev mode (playtesting)

Add `?dev=1` to the URL (e.g. `index.html?dev=1`) to enable a level-jump dev
mode in-game: press **1-9** or **0** to jump straight to levels 1-10
(re-triggering that level's station reveal/tutorial), and **+ / -** to step
the level up or down by one. Dev jumps don't affect the saved best level.
Add `&level=N` to start the run on level N. Dev mode also gives you a
huge coin balance so you can freely buy every Store upgrade and cosmetic
to test their effects.

## Project layout

```
index.html              # loads Phaser + the source files
src/
  main.js               # Phaser game config
  sound.js              # procedural Web Audio sound effects
  save.js               # localStorage best-level record
  pixelArt.js           # ASCII-grid sprite definitions + texture builder
  scenes/
    BootScene.js        # generates all textures, then starts the game
    MenuScene.js        # title screen
    GameScene.js        # the whole coffee shop: pouring, customers, upgrades
```

## Ideas to build next

- Multiple drink types (add milk/foam steps, latte art mini-game).
- Drag-to-place shop layout / decoration mode.
- Day/night cycle with rush hours.
- Persistent progress via `localStorage`.
- Real sprite sheets dropped into `pixelArt.js`'s asset slots.
```
