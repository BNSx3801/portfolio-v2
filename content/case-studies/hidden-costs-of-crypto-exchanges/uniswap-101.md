By now, we’ve traced the arc of DeFi’s rise — from how it challenges Wall Street’s architecture to how DEXs and AMMs reimagined what an exchange could be. But ideas alone don’t move capital. Code does. And no protocol captures this ethos more cleanly than **Uniswap** — a platform where liquidity flows not through order books, but through curves drawn in _Solidity_.

_This piece is where we slow down and zoom in._

Here, we walk through the actual geometry that powers a DEX like Uniswap — how liquidity pools are formed, what it means to be a liquidity provider, and how rewards are earned. We’ll explore how swaps are executed under the hood: what happens when one token is sold into the pool and another is bought out of it, all without a counterparty on the other end. And of course, we’ll look at what most overviews politely skip — the risks baked into the system, often misunderstood until it’s too late.

Why Uniswap? Because it’s not just the largest DEX — it’s the proving ground for automated market making. With **v4** on the horizon, the protocol is becoming more modular, more programmable, and more expressive. Hooks, singleton architecture, and custom liquidity behavior aren’t just upgrades — they mark a shift in how liquidity can be shaped going forward. We'll touch on that, too.

_If this is your first stop, consider reading the previous entries for fuller context:_

- [Is DeFi Really Eating Up Wall Street?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/is-defi-eating-wall-street)
- [CEXs Walked So DEXs Could Run! But, are they capable of running?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cexs-walked-so-dexs-could-run)
- [Cracking Open the AMM Black Box](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cracking-open-the-amm-black-box)

Now, let’s step into the pool — not just to get our feet wet, but to understand how the tides of value really move.

# Pool: The Liquidity Reservoir

If you’ve been following along, we’ve already broken down the key players that orbit a decentralized exchange — the traders, the liquidity providers, the arbitrageurs, and the smart contracts that tie them all together. (If not, give _[Cracking Open the AMM Black Box](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cracking-open-the-amm-black-box)_ a read — we unpacked the entire cast.)

Now, let’s talk about the stage they perform on: **The Pool**.

![Four people around a glowing hexagonal Uniswap table, its surface a swirl of purple WETH and blue USDC](/assets/hidden-costs/p4-pool.jpeg)

Consider a liquidity pool to be a virtual vault — a permissionless pot of tokens sitting inside a smart contract. Imagine it as a container. Anyone can walk in, drop in one kind of token, and walk out with another — as long as the value of what’s taken matches the value of what’s added. The quantity may shift, but the value remains in balance. No order books. No counterparties. Just assets waiting to be swapped.

Now, while the abstract pool can technically hold any number of tokens, **Uniswap’s current model (v2 through v4)** sticks with pairs. ETH/USDC. WETH/USDT. DAI/USDT. Two tokens, held in balance, ready to be exchanged according to a mathematical formula — one that we’ll explore shortly.

With **Uniswap v4**, pools have become more expressive. Native ETH is now directly supported (no need to wrap), and the architecture allows developers to extend pool logic through hooks — but at its foundation, the pool still behaves the same: a fluid space where you give one asset and receive another, priced by the invisible hand of code.

Before we get into how those prices are set or what happens when the balance inside the pool shifts, it’s important to grasp this conceptual anchor: a pool is not a market in the traditional sense. It’s a programmable reservoir of liquidity — and it only works because people are willing to pour their tokens into it.

# Someone Put Those Tokens There!

Okay, so now we understand that a pool functions as a reservoir of liquidity — a smart contract holding tokens, available for swaps. But unlike in centralized exchanges, where a third party holds custody of large token reserves, a decentralized exchange doesn’t have a treasury or a market-making engine of its own. The liquidity has to come from somewhere else.

This is where liquidity providers come in.

Rather than relying on an intermediary, AMMs like Uniswap are powered by individuals who choose to supply tokens into the pool — typically in a specified ratio, depending on the parameters of that pool. These individuals, referred to as **Liquidity Providers (LPs)**, effectively make the market by allowing their tokens to be used in trades.

And it’s not just generosity — there’s incentive built in. Whenever a trade is executed through the pool, a small fee is charged to the trader. That fee is distributed among the LPs, in proportion to the share of the pool they’ve contributed. In Uniswap’s architecture, these fees are split across **three primary tiers: 0.05%, 0.3%, and 1%**, each suited to different types of assets and expected volatility.

So, when a trader swaps USDC for ETH in the ETH/USDC pool, it’s not Uniswap holding the ETH — it’s the LPs. If their assets are used in that transaction, they earn the corresponding fee.

> _**“Wait... what exactly is a position?”**_
>
> _We’ll get to that next. For now, just know that providing liquidity isn’t as static as it once was — and in Uniswap’s current form, where and how you place your tokens matters more than ever._

# The Swap Equation: Where Price, Curve & Liquidity Intersect!

A liquidity pool has been set up — a token pair selected, a fee tier chosen. It’s time for a swap. For continuity, let’s stick with the same example we’ve been using throughout: **WETH/USDC**.

A trader arrives with WETH, hoping to receive an equivalent value in USDC. They connect their wallet to the dApp, select the appropriate chain, and initiate the swap.

Behind the sleek interface, a **Constant Function Market Maker (CFMM)** kicks into action. In Uniswap’s case, the function at play is the now-iconic equation: **x \* y = k**

Here, `x` represents the reserve of **Token-0** (WETH in our case), `y` is the reserve of **Token-1** (USDC), and `k` is a constant — meaning the product of `x` and `y` must remain unchanged after the trade. This simple curve governs how much USDC the trader receives based on how much WETH they’re adding.

![Handwritten working: x times y equals k, the spot price P equals dy over dx equals minus y over x, and solving (x + Δx)(y − Δy) = k gives Δy = xy over (x + Δx) subtracted from y](/assets/hidden-costs/p4-swap-equation.png)

Naturally, when the token reserves change, the spot price of the tokens adjusts accordingly. _In other words,_ **the price within a pool changes with every swap.** This suggests that the price within the pool may differ from that of external markets. _We’ll remember that one for later as well!_

One compelling question arises here — _**why this particular curve?**_

![Sketch of the x·y = k curve, a rectangular hyperbola that falls steeply then flattens, with x as Token-0 (WETH) and y as Token-1 (USDC)](/assets/hidden-costs/p4-hyperbola.png)

Mathematically, it’s a **rectangular hyperbola**, one that stretches toward infinity. This design ensures that the pool _never_ runs out of either token. Even as one token’s reserve gets extremely low, the price asymptotically increases, discouraging further depletion. Theoretically, complete exhaustion is impossible.

Of course, that design choice isn’t without its drawbacks. And oh boy — we’ll get to that soon enough.

# What Happens When Price Moves… but Your Liquidity Doesn’t?

Liquidity, in theory, is always working. But in practice? Not quite.

Let’s revisit our WETH/USDC pool. Suppose a liquidity provider deposits their tokens in what’s known as a **full-range position** — meaning they’ve made their assets available across _every possible price point_, from near-zero to infinity. On the surface, this feels generous, even exhaustive. You’re covering all eventualities. How could this not be optimal?

But here’s the catch: **most of that range sees no trading activity**. Markets don’t spend their days bouncing between the extremes. Price tends to concentrate in narrow bands. And when the current market price isn’t sitting within the active part of your range, your liquidity becomes inert — untouched, unused, unproductive.

![Three panels: full-range liquidity spread across every price and mostly unused; concentrated liquidity focused where trades occur; an out-of-range position where price has moved outside the range and earns nothing](/assets/hidden-costs/p4-positions.png)

This is where Uniswap’s model begins to sharpen. With **Uniswap v3**, liquidity providers no longer have to spread themselves thin. Instead, they can define a **position** — a concentrated band within the pool’s price range where their liquidity is active. Only when the market price falls within this custom range does their capital participate in swaps. And only then do they earn fees.

It’s a subtle but powerful shift. LPs are no longer just passive contributors; they’re making tactical decisions. Too narrow a range, and you risk being out of the action. Too wide, and your capital is diluted across price points where no trading happens.

In essence:

> **Liquidity is only rewarded when it shows up where it's needed.**

And when price moves outside of your chosen range? Your position becomes entirely converted to one side of the pair — say, all USDC or all WETH — and just sits there, unproductive, until the price reenters your band.

This is where active management enters the picture. Providing liquidity is no longer a one-time act — it’s a position in the market. And like any position, it needs to be monitored.

# What’s Next?

This wasn’t a deep dive into the entirety of Uniswap — that’s a rabbit hole of its own. Instead, we used Uniswap as a lens, a reference point to decode how decentralized exchanges function beneath the surface: how liquidity is sourced, how swaps are executed, and how LPs position themselves within the pool. These foundational mechanics are common to many AMMs, and understanding them is essential before engaging with the more complex dynamics of the DEX world.

_But of course, smooth curves and clever equations aren’t the whole story._

In the next chapter of this series, we’ll begin exploring the frictions and flaws: the reality of **Impermanent Loss**, the consequences of **thin or misaligned liquidity**, and the growing concern around **MEV attacks** and value extraction in public blockspace. Because while DEXs may be elegant in design, they’re still very much under construction — and the cracks, when they appear, are often expensive.

_Stay tuned. The next layer is where things get real._

_Originally published on [Substack](https://bnsx3801.substack.com/p/uniswap-101-providing-liquidity-earning), 15 July 2025._
