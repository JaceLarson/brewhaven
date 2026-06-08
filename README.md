# ☕ Brewhaven — a pixel coffee shop

A tiny browser game: serve customers by pouring coffee to the right level, earn
coins, and spend them on upgrades. All the pixel art is generated in code — no
image files — and the sound effects are synthesized with the Web Audio API, so
the whole thing is self-contained.

Built with [Phaser 3](https://phaser.io/) (loaded from a CDN).

## How to play

It's a level-based run — clear each level's quota without losing all your hearts.

- **Move the barista** between the two coffee makers with **A/D** or **←/→**.
- Each drink is made at a specific maker: **Espresso & Latte** at the espresso
  machine, **Drip & Tea** at the drip tower. The order bubble's **border color**
  and the pulsing **sign** tell you which maker to be at.
- **Click a maker** (the one you're standing at) or hold **SPACE** to pour.
  Release **inside the green zone** for a `PERFECT!` (big tip + hearts).
- Chain good pours for a **combo multiplier** on your coins.
- **Hearts (×3):** you lose one when a customer **walks out**, you serve the
  **wrong drink**, or you **spill** (overfill). Lose all three → **Game Over**.
- **Clear a level** by serving its quota of correct drinks, then **pick one of
  three perk cards** (faster pour, wider zone, more patience, extra heart, a
  coin windfall, …).
- Difficulty climbs each level: faster spawns, shorter patience, tighter zones,
  longer queues, and drip drinks join the mix from level 2.

## The Store (spend your coins)

Hit the **🛍 STORE** button (top-right) any time during a level — it pauses the
action while you shop. Four tabs:

- **Upgrades** — repeatable mechanical boosts (Faster Pour, Generous Tips, Calm
  Crowd, Steady Hands, Combo Pro, Extra Heart). Each purchase levels the upgrade
  up and the next one costs more — the better it is, the pricier it gets.
- **Walls** — re-theme the whole back wall (Brick, Sky, Forest, Sunset, Cozy
  Wood, …). Buy once, then equip any owned theme for free.
- **Coffee Makers** — reskin both machines (Matte Black, Mint, Copper, Gilded
  Brass).
- **Decorations** — a floor rug, potted plants, a sleeping shop cat, a neon
  sign, string lights, and wall art placed around the shop.

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

## Project layout

```
index.html              # loads Phaser + the source files
src/
  main.js               # Phaser game config
  sound.js              # procedural Web Audio sound effects
  pixelArt.js           # ASCII-grid sprite definitions + texture builder
  scenes/
    BootScene.js        # generates all textures, then starts the game
    GameScene.js        # the whole coffee shop: pouring, customers, upgrades
```

## Ideas to build next

- Multiple drink types (add milk/foam steps, latte art mini-game).
- Drag-to-place shop layout / decoration mode.
- Day/night cycle with rush hours.
- Persistent progress via `localStorage`.
- Real sprite sheets dropped into `pixelArt.js`'s asset slots.
```
